import React from 'react';

const customButtonStyling = {
  position: 'relative',
  color: 'red',
  float: 'left',
  left: -5,
  top: 1
};

const listStyleNone = {
  listStyle: 'none'
};

const ListResults = props => (
  <div className="text-left mt-4">
    <ul style={listStyleNone}>
      {
        props.items
          .map(
            (item, index) =>
              <li key={index}>
                <span>
                  <button
                    style={customButtonStyling}
                    type="button" 
                    className="close" 
                    aria-label="Close"
                    onClick={ () => props.removeItem(item, index) }
                  >
                    <span aria-hidden="true">
                      &times;
                    </span>
                  </button>
                </span>
                <u><b>Text:</b></u> { item.text } {' '}
                <u><b>Language:</b></u> { item.language }
              </li>
          )
      }
    </ul>
  </div>
);

export default ListResults;