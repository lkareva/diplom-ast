import React from 'react';

const MyInput = React.forwardRef((props, ref) => {
    return (
        <div className="search__item">
            <input ref={ref} className="search__input" {...props}/>
        </div>
    )
})

export default MyInput