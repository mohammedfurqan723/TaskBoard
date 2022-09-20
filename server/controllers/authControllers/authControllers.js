require('dotenv').config();
const path = require('path');
const jwt = require('jsonwebtoken');
const sendMail = require('../nodeMailerController/sendMail')
// const UsersAuth = require(path.join(__dirname, "../" ,"../" ,"models", "users", "usersAuthModel.js"));

const UserAuth = require('../../models/users/usersAuthModel');
const UserDetails = require('../../models/users/usersDetailsModel');
const PersonalTask = require('../../models/tasks/personalTaskModel');
const Task = require('../../models/tasks/taskModel');
const Activities = require('../../models/activity/activityModel')


const authCtrls = {
    registration: async (req, res) => {
        try {

            const { firstName, lastName, email, phoneNumber, password, conformPassword } = req.body;

            let errors = new Object();

            if (!firstName) errors.firstName = "Please Enter Your First Name.";
            if (!lastName) errors.lastName = "Please Enter Your Last Name.";
            if (!email) {
                errors.email = "Please Enter Your Email Address.";
            }
            else {
                const user = await UserAuth.findOne({ email: email });

                if (user) {
                    errors.email = "Email Already Exists.";
                };
            };

            if (!phoneNumber) errors.phoneNumber = "Please Enter Your Phone Number.";

            if (!password) errors.password = "Please Enter Password.";
            else if (password.length <= 6) errors.password = "Password Should Contain Atleast 6 Or More Characters.";

            if (!conformPassword) errors.conformPassword = "Please Enter Conform Password.";
            else if (conformPassword !== password) errors.conformPassword = "Passwords Do Not Match.";

            let hasErrors = Object.keys(errors).length;

            if (hasErrors >= 1) {
                return res.status(400).json(errors);
            };

            const userDetails = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                password: password,
                conformPassword: conformPassword,
            }

            const activationToken = generateActivationToken(userDetails);

            const url = `http://localhost:3000/taskboard/registration/activation-token/${activationToken}`;

            sendMail(userDetails.email, url, "Verify your email.")

            res.status(200).json({ "message": "Activation link has been sent to your email." });

        }
        catch (err) {
            res.status.json(err);
        };
    },
    activation: async (req, res) => {
        try {

            const { activationToken } = req.body;

            const user = jwt.verify(activationToken, process.env.SECERT_ACTIVATION_TOKEN);

            if (!user) return;

            const isUserExist = await UserAuth.findOne({ "email": user.email });

            if (!isUserExist) {
                const userDetails = await UserDetails.create({});
                const personalTasks = await PersonalTask.create({});
                const activities = await Activities.create({});

                const userAuth = await UserAuth.create({ ...user, personalTasks: personalTasks, userDetails: userDetails, activities:activities });

                await PersonalTask.findByIdAndUpdate(personalTasks._id, { user: userAuth });
                await UserDetails.findByIdAndUpdate(userDetails._id, { user: userAuth });

                let message = 'Joined TaskBoard.'

                addActivity(activities._id, message);
            };

            res.status(200).json({ "message": "Successfully Registered." });

        } catch (err) {
        };
    },
    userDetails: async (req, res) => {
        try {
            const { displayName, unicompi, currentPosition, location, dob, workType, email, phoneNumber, userDetailsId } = req.body;

            const resp = await UserDetails.findByIdAndUpdate(userDetailsId, {
                displayName: displayName,
                unicompi: unicompi,
                currentPosition: currentPosition,
                location: location,
                dob: dob,
                workType: workType,
                phoneNumber: phoneNumber,
                email: email,
                requiredData: true,
            })

            res.status(200).json({ message: "Successfully Updated User Details." })
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    login: async (req, res) => {
        try {

            const { email, password } = req.body;

            let errors = {};

            let user;

            if (!email) {
                errors.email = "Please Enter Your Email.";
                return res.status(400).json(errors);
            }
            else {
                user = await UserAuth.findOne({ email: email });

                if (!user) {
                    errors.email = "Email Is Not Registered.";
                    return res.status(400).json(errors);
                };
            };

            if (!password) {
                errors.password = 'Please Enter Password.'
                return res.status(400).json(errors);
            }
            else {
                if (user.password !== password) {
                    errors.password = 'Incorrect Password.'
                    return res.status(400).json(errors);
                }
            }

            const refreshToken = generateRefreshToken({ id: user._id });

            res.cookie('RefreshToken', refreshToken, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.status(200).json({ message: "LoggedIn Successfully." })

        } catch (err) {
            res.status(500).json(err)
        }
    },
    getAccessToken: async (req, res) => {
        try {
            const refreshToken = req.cookies.RefreshToken;

            if (!refreshToken) return res.status(400).json({ msg: "Please Login." });

            jwt.verify(refreshToken, process.env.SECERT_REFRESH_TOKEN, (err, user) => {

                if (err) return res.status(400).json({ msg: "Please Login." });

                const accessToken = generateAccessToken({ id: user.id });

                res.status(200).json({ accessToken: accessToken });
            });
        }
        catch (err) {
            console.log(err);
        };
    },
    userinfo: async (req, res) => {
        try {
            const userId = req.user;

            if (!userId) return res.status(400).json({ msg: "Please Login." });

            const user = await UserAuth.findById(userId.id).select('-password');

            res.status(200).json(user);

        } catch (err) {
            console.log(err);
        };
    },
    getUserDetails: async (req, res) => {
        try{
            const { id } = req.params;

            const resp = await UserDetails.findById(id);

            res.status(200).json(resp)
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    updateAboutMe:async (req, res) => {
        try {
            const {data, userDetailsId} = req.body;
            
            await UserDetails.findByIdAndUpdate(userDetailsId, {
                aboutMe:data
            });

            res.status(200).json({message:"Successfully Updated"});
            
        } catch (err) {
            res.status(500).json(err);
        };
    },
    updatePersonalDetails: async (req, res) => {
        try {
            const { email, phoneNumber, dob, workType, userDetailsId } = req.body;
            
            await UserDetails.findByIdAndUpdate(userDetailsId, {
                email:email,
                phoneNumber:phoneNumber,
                dob:dob,
                workType:workType
            });

            res.status(200).json({ message: "Successfully Updated." })
        }
        catch (err) {
            res.status(500).json(err);
        };
    },
    addCompany: async (req, res) => {
        try {
            const { userDetailsId, ...restData } = req.body;

            await UserDetails.findByIdAndUpdate(userDetailsId, {
                $push: {
                    allExperience: restData
                }
            });

            res.status(200).json({ message: "Successfully Updated." })
        }
        catch (err) {
            res.status(500).json(err);
        };
    },
    updateCompany: async (req, res) => {
        try {
            const { userDetailsId, companyId, company, startDate, endDate, workType, position } = req.body;


                await UserDetails.updateOne({"_id":userDetailsId},
                {$set:{
                    [`allExperience.${companyId}.company`]:company,
                    [`allExperience.${companyId}.position`]:position,
                    [`allExperience.${companyId}.workType`]:workType,
                    [`allExperience.${companyId}.startDate`]:startDate,
                    [`allExperience.${companyId}.endDate`]:endDate
                }})

            res.status(200).json({ message: "Successfully Updated." })
        }
        catch (err) {
            res.status(500).json(err);
        };
    },
    deleteCompany: async (req, res) => {
        try {
            const { companyId, experience } = req.body;

            await UserDetails.findByIdAndUpdate(experience.userDetailsId, 
                {$unset:{
                    [`allExperience.${companyId}`]:companyId
                }})

            await UserDetails.findByIdAndUpdate(experience.userDetailsId,{
                $pull:{
                    allExperience:null
                }
            })

            res.status(200).json({message:"Successfully Removed"});
            
        } catch (err) {
            res.status(500).json(err);
        };
    },
    addCollege: async (req, res) => {
        try {
            const { userDetailsId, ...restData } = req.body;

            await UserDetails.findByIdAndUpdate(userDetailsId, {
                $push: {
                    allEducation: restData
                }
            });

            res.status(200).json({ message: "Successfully Updated." })
        }
        catch (err) {
            res.status(500).json(err);
        };
    },
    updateCollege: async (req, res) => {
        try {
            const {college, degree, location, startDate, endDate, collegeId, userDetailsId} = req.body;
            
            await UserDetails.findByIdAndUpdate(userDetailsId, {
                $set:{
                    [`allEducation.${collegeId}.college`]:college,
                    [`allEducation.${collegeId}.degree`]:degree,
                    [`allEducation.${collegeId}.location`]:location,
                    [`allEducation.${collegeId}.startDate`]:startDate,
                    [`allEducation.${collegeId}.endDate`]:endDate,
                }
            })

            res.status(200).json({message:'Successfully Updated.'})

        } catch (err) {
            res.status(500).json(err);
        };
    },
    deleteCollege: async (req, res) => {
        try {
            const {userDetailsId, collegeId} = req.body;
            
            await UserDetails.findByIdAndUpdate(userDetailsId, {
                $unset:{
                    [`allEducation.${collegeId}`]:collegeId
                }
            })

            await UserDetails.findByIdAndUpdate(userDetailsId, {
                $pull:{
                    allEducation:null
                }
            })

            res.status(200).json({message:"Successfully Deleted."})
            
        } catch (err) {
            res.status(500).json(err)
        }
    },
    addSkill: async (req, res) => {
        try {
            const { userDetailsId, data } = req.body;

            await UserDetails.findByIdAndUpdate(userDetailsId, {
                $push: {
                    skills: data
                }
            });

            res.status(200).json({ message: "Successfully Added." })
        }
        catch (err) {
            res.status(500).json(err);
        };
    },
    deleteSkill: async (req, res) => {
        try {
            const { id, userdetailsid } = req.params;
            await UserDetails.findByIdAndUpdate(userdetailsid, {
                $pull: {
                    skills: id
                }
            });

            res.status(200).json({ message: "Successfully Deleted." });

        }
        catch (err) {
            res.status(500).json(err);
        };
    },
    addLanguage: async (req, res) => {
        try {
            const { userDetailsId, data } = req.body;

            await UserDetails.findByIdAndUpdate(userDetailsId, {
                $push: {
                    languages: data
                }
            });

            res.status(200).json({ message: "Successfully Added." })
        }
        catch (err) {
            res.status(500).json(err);
        };
    },
    deleteLanguage: async (req, res) => {
        try {
            const { id, userdetailsid } = req.params;

            await UserDetails.findByIdAndUpdate(userdetailsid, {
                $pull: {
                    languages: id
                }
            })

            res.status(200).json({ message: "Successfully Deleted." })

        }
        catch (err) {
            res.status(500).json(err)
        }
    }
};

const generateActivationToken = (payload) => {
    return jwt.sign(payload, process.env.SECERT_ACTIVATION_TOKEN, { expiresIn: '10min' });
};

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.SECERT_REFRESH_TOKEN, { expiresIn: '7d' });
};

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.SECERT_ACCESS_TOKEN, { expiresIn: '15min' });
}

const addActivity = async(id, message) =>{
    try{
        let date = new Date();

        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        let data ={
            message:message,
            day:day,
            month:month,
            year:year
        }

        await Activities.findByIdAndUpdate(id, {
            $push:{
                activities:data
            }
        });
    }
    catch(err){
        console.log(err);
    };
};

module.exports = authCtrls;