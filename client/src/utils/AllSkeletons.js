import './AllSkeletons.css'

const Skeleton = ({skltn, skltn__len}) => {
    return (
        <div className={`${skltn} ${skltn__len} skeleton__animation`}></div>
    )
}
export default Skeleton