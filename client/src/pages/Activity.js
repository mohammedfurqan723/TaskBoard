import '../css/Activity.css';

function Activity() {
    return (
        <section className="activity__section">
            <h2 className='panel__name activity__name'>Activity</h2>

            <div className='activity__wpr'>
                <span className='activity__line__desc__wpr'>
                    <span className='short__line' />
                    <span className='activity__desc'>
                        Added New Task In Personal Workspace Named "Landing Page" In Development Category.
                    </span>
                </span>
                <span className='activity__time'>
                    August 21 2022
                </span>
            </div>

            
            <div className='activity__wpr'>
                <span className='activity__line__desc__wpr'>
                    <span className='short__line' />
                    <span className='activity__desc'>
                        Added First Task.
                    </span>
                </span>
                <span className='activity__time'>
                    August 21 2022
                </span>
            </div>

            <div className='activity__wpr'>
                <span className='activity__line__desc__wpr'>
                    <span className='short__line' />
                    <span className='activity__desc'>
                        Joined TaskBoard.
                    </span>
                </span>
                <span className='activity__time'>
                    August 20 2022
                </span>
            </div>

        </section>
    );
};

export default Activity;