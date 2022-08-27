const accordion = (e) => {
    let taskBoxCtr = e.target.parentElement.parentElement.parentElement.parentElement;

    if (taskBoxCtr.classList[0] === 'tb__ctr' && e.target.className === 'arrow__img') {

        let tbNameOptionWprHeight = taskBoxCtr.firstChild.clientHeight;

        if (taskBoxCtr.classList[1] !== 'active') {
            taskBoxCtr.classList.add('active');
            taskBoxCtr.style.maxHeight = tbNameOptionWprHeight + 'px';
        }
        else {
            taskBoxCtr.classList.remove('active');
            taskBoxCtr.style.maxHeight = (taskBoxCtr.firstChild.nextElementSibling.clientHeight + tbNameOptionWprHeight) + 'px';
        }
    }

    let taskCategoryCtr = e.target.parentElement.parentElement.parentElement.parentElement;

    if (taskCategoryCtr.classList[0] === 'task__category__ctr' && e.target.className === 'arrow__img') {

        let taskBoxes = taskCategoryCtr.children;

        if (taskCategoryCtr.classList[1] !== 'active') {

            taskCategoryCtr.classList.add('active');

            Array.from(taskBoxes).forEach((taskBox) => {

                if (taskBox.classList[0] === 'tb__ctr' && taskBox.classList[1] !== 'active') {
                    taskBox.classList.add('active');
                    taskBox.style.maxHeight = taskBox.firstChild.clientHeight + 'px'
                };

            });
        }
        else {

            taskCategoryCtr.classList.remove('active');

            Array.from(taskBoxes).forEach((taskBox) => {

                if (taskBox.classList[0] === 'tb__ctr' && taskBox.classList[1] === 'active') {
                    taskBox.classList.remove('active');
                    let totalHeight = taskBox.firstChild.clientHeight + taskBox.firstChild.nextElementSibling.clientHeight;
                    taskBox.style.maxHeight = totalHeight + 'px';
                };

            });

        };
    };

    if (taskBoxCtr.classList[0] === 'tb__ctr' && e.target.className === 'arrow__img') {

        let taskCategoryWpr = taskBoxCtr.parentElement;
        let taskBoxes = taskCategoryWpr.children;

        let isActive = true;

        Array.from(taskBoxes).forEach((taskBox) => {

            if (isActive === true) {

                if (taskBox.classList[0] === 'tb__ctr') {
                    if (taskBox.classList[1] !== 'active') {
                        isActive = false;
                    };
                };
                
            };

        });

        if (isActive) {
            taskCategoryWpr.classList.add('active');
        }
        else {
            taskCategoryWpr.classList.remove('active');
        };

    };
};

export default accordion;