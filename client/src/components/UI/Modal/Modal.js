import React from 'react'
import cl from './Modal.module.css'
const AddModal = ({children, visible, setVisible}) => {

    const rootClasses = [cl.modal]

    if (visible) {
        rootClasses.push(cl.active);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.modal__content} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default AddModal