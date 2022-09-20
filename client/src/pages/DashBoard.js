import '../css/DashBoard.css'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { PieChart, Pie, Line, Legend, Cell, ResponsiveContainer, Area, Tooltip, XAxis, YAxis, AreaChart } from 'recharts'

const DashBoard = () => {
    const [monthlyWise, setMonthlyWise] = useState([])
    const [taskCounter, setTaskCounter] = useState({});
    const { userAuth, userPersonalTasks } = useSelector(state => state.userReducer);

    useEffect(() => {
        if (userPersonalTasks) {
            let development = userPersonalTasks?.development.length;
            let design = userPersonalTasks?.design.length;
            let bugfix = userPersonalTasks?.bugfix.length;
            let completed = userPersonalTasks?.completed.length;

            let totalTasks = development + design + bugfix + completed;
            let onGoingTasks = totalTasks - completed;
            let totalTasksDone = completed;

            setTaskCounter({
                development: development,
                design: design,
                bugfix: bugfix,
                completed: completed,
                totalTasks: totalTasks,
                onGoingTasks: onGoingTasks,
                totalTasksDone: totalTasksDone
            })
        }
    }, [userPersonalTasks]);

    useEffect(() => {
        let data = [
            {
                "name": "January",
                "taskAdded": 0,
                "taskCompleted": 0
            },
            {
                "name": "February",
                "taskAdded": 0,
                "taskCompleted": 0
            },
            {
                "name": "March",
                "taskAdded": 0,
                "taskCompleted": 0
            },
            {
                "name": "April",
                "taskAdded": 0,
                "taskCompleted": 0
            },
            {
                "name": "May",
                "taskAdded": 0,
                "taskCompleted": 0
            },
            {
                "name": "June",
                "taskAdded": 0,
                "taskCompleted": 0
            },
            {
                "name": "July",
                "taskAdded": 0,
                "taskCompleted": 0
            },
            {
                "name": "August",
                "taskAdded": 0,
                "taskCompleted": 0
            },
            {
                "name": "September",
                "taskAdded": 0,
                "taskCompleted": 0
            },
            {
                "name": "October",
                "taskAdded": 0,
                "taskCompleted": 0
            },
            {
                "name": "November",
                "taskAdded": 0,
                "taskCompleted": 0
            },
            {
                "name": "December",
                "taskAdded": 0,
                "taskCompleted": 0
            },

        ];

        userPersonalTasks?.completed?.map((item) => {
            let month = new Date(item?.createdAt).getMonth();
            return data[month].taskAdded = data[month].taskAdded + 1;
        })

        userPersonalTasks?.completed?.map((item) => {
            let completedMonth = item?.completedDate?.split("/");
            if (completedMonth) {
                return data[parseInt(completedMonth[1]) - 1].taskCompleted = data[parseInt(completedMonth[1]) - 1].taskCompleted + 1;
            }
            return data
        })

        userPersonalTasks?.development?.map((item) => {
            let month = new Date(item?.createdAt).getMonth();
            return data[month].taskAdded = data[month].taskAdded + 1;
        })

        userPersonalTasks?.design?.map((item) => {
            let month = new Date(item?.createdAt).getMonth();
            return data[month].taskAdded = data[month].taskAdded + 1;
        })

        userPersonalTasks?.bugfix?.map((item) => {
            let month = new Date(item?.createdAt).getMonth();
            return data[month].taskAdded = data[month].taskAdded + 1;
        })

        let joinedMonth = new Date(userAuth?.createdAt).getMonth();
        joinedMonth = parseInt(joinedMonth);

        if (joinedMonth !== 0) {
            data = data.slice(joinedMonth - 1, data.length);
        }
        else {
            data = data.slice(joinedMonth, data.length);
        }

        setMonthlyWise(data)

    }, [userPersonalTasks, userAuth])

    const data = [
        {
            "name": "Development",
            "value": taskCounter?.development,
            "color": "#eb1d36"
        },
        {
            "name": "Design",
            "value": taskCounter?.design,
            "color": "#6fedd6"
        },
        {
            "name": "BugFix",
            "value": taskCounter?.bugfix,
            "color": "#b1b2ff"
        },
        {
            "name": "Completed",
            "value": taskCounter?.completed,
            "color": "#FFC300"
        }
    ];

    return (
        <section id='db__section'>
            <h1 className='wel__txt'>Welcome {userAuth?.firstName} {userAuth?.lastName}  🎉</h1>
            <h4 className='count__desc'>Here is your Tasks/Projects track.</h4>
            <div className='dashboard__ctr'>
                <div className='counters__ctr'>
                    <div className='counter__one counter__wpr'>
                        <span className='count__txt'>{taskCounter?.totalTasks}</span>
                        <span className='counter__label'>Total Tasks</span>
                    </div>
                    <div className='counter__two counter__wpr'>
                        <span className='count__txt'>{taskCounter?.onGoingTasks}</span>
                        <span className='counter__label'>On Going</span>
                    </div>
                    <div className='counter__three counter__wpr'>
                        <span className='count__txt'>{taskCounter?.totalTasksDone}</span>
                        <span className='counter__label'>Done</span>
                    </div>
                </div>

                <h4 className='count__desc'>Monthly wise Task Added and Completed.</h4>
                <div className='chart2' >
                    <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={monthlyWise}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis stroke='white' dataKey="name" />
                            <YAxis stroke='white' />
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={20} />
                            <Line name="Task Added" type="monotone" dataKey="taskAdded" stroke="#8884d8" />
                            <Line name="Task Completed" type="monotone" dataKey="taskCompleted" stroke="#82ca9d" />
                            <Area type="monotone" dataKey="taskAdded" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                            <Area type="monotone" dataKey="taskCompleted" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <h4 className='count__desc'>Category wise Pie Chart.</h4>
                <div className='chart1'>
                <ul className='category__wpr'>
                    <li className='category__li'><span className='color__box development'/>Development</li>
                    <li className='category__li'><span className='color__box design'/>Design</li>
                    <li className='category__li'><span className='color__box bugfix'/>BugFix</li>
                    <li className='category__li'><span className='color__box completed'/>Completed</li>
                </ul>
                    <ResponsiveContainer width="100%" height="90%">
                        <PieChart>
                            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={30} outerRadius={60} label letterSpacing={1} >
                                {
                                    data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))
                                }
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className='recent__ctr'>
                    <h3 className='recent__title'>Recent Activity</h3>
                    <span className='recent__txt'>Added Portfolio Task to Development</span>
                    <span className='recent__txt'>Completed Valorant Task in Design</span>
                    <span className='recent__txt'>Updated Checkpoints in Valorant Task in Design</span>
                    <span className='recent__txt'>Edited Momos Task in BugFix</span>
                </div>
            </div>
        </section>
    );
};

export default DashBoard;