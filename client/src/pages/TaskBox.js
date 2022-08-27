import avatar from '../asserts/logo/avatar9.png'
import chat from '../asserts/logo/bubble-chat.png'
import down from '../asserts/logo/down.png'
import '../css/TaskBox.css'

const TaskBox = ({ data }) => {
    return (
        <div className='tb__ctr'>
            <div className='tb__name__opts__wpr flex-row'>
                <h3 className='tb__name flex-row'><span className='title__dot'></span>{data?.taskName}</h3>
                <div className='dots__arrow__wpr flex-row'>
                    <div className='arrow__wpr icon__wpr'>
                        <img className='arrow__img' src={down} alt='' />
                    </div>
                    <div className='tb__dots__wpr icon__wpr flex-row'>
                        <span className='tb__dot'></span>
                    </div>
                </div>
            </div>
            <div className='tb__cnt__ctr'>
                <span className='tsk__sht__desc'>{data?.shortDesc}</span>
                <div className='tsk__tags__wpr flex-row'>
                    <span className='tsk__tag tag__one'>New Client</span>
                    <span className='tsk__tag tag__two'>New Project</span>
                    <span className='tsk__tag tag__three'>System Design</span>
                </div>

                <div className='tb__profile__ctr flex-row'>
                    <div className='profiles__wpr flex-row'>
                        <div className='profile__wpr profile__wpr__one'><img className='profile__img  profile__img__one' src={avatar} alt='' /></div>
                        <div className='profile__wpr profile__wpr__two'><img className='profile__img  profile__img__two' src={avatar} alt='' /></div>
                        <div className='profile__wpr profile__wpr__three'><img className='profile__img  profile__img__three' src={avatar} alt='' /></div>
                    </div>
                    <div className='cmts__wpr flex-row'>
                        2 Comments
                        <div className='cmt__icn__wpr'>
                            <img className='cmt__icn' src={chat} alt='comment-icn' />
                        </div>
                    </div>
                </div>

                <div className='progress__bar__est__ctr flex-row'>
                    <div className='progress__bar__percentage__wpr flex-row'>
                        <div className='progress__bar'><div className='progress__fill' /></div> 70%
                    </div>
                    <div className='est__wpr'>
                        Est. {data?.estTime}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TaskBox