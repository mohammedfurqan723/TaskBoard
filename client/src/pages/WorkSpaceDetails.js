import '../css/WorkSpaceDetails.css'

const WorkSpaceDetails = ({data}) => {
    return (
        <div className='panel__details__ctr'>
            <h2 className='panel__name'>{data.title}</h2>
            <p className='panel__srt__desc'>{data.desc}</p>
        </div>
    )
}

export default WorkSpaceDetails