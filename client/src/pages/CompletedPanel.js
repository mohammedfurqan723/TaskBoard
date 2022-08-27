import NoTaskCompleted from './NoTaskCompleted'
import '../css/CompletedPanel.css'

const CompletedPanel = () => {

    const data = ""
    return(
        <section className="tcp__ctr">
            {!data? 
                <NoTaskCompleted/>
            :
            ""}
        </section>
    )
}

export default CompletedPanel