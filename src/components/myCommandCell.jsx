import React from 'react';

export function MyCommandCell({ edit, remove, add, update, discard, cancel, editField }) {
    return class extends React.Component {
        render() {
            const { dataItem } = this.props;
            const inEdit = dataItem[editField];
            //const inEdit = editField;
            const isNewItem = dataItem.QuarterID === undefined;
            //const isNewItem = false;

            return inEdit ? (
                <td className="k-command-cell">
                    <button
                        className="k-button k-grid-save-command"
                        onClick={() => isNewItem ? add(dataItem) : update(dataItem)}
                    >
                        {isNewItem ? 'Add' : 'Update'}
                    </button>
                    <button
                        className="k-button k-grid-cancel-command"
                        onClick={() => isNewItem ? discard(dataItem) : cancel(dataItem)}
                    >
                        {isNewItem ? 'Discard' : 'Cancel'}
                    </button>
                </td>
            ) : (
                <td className="k-command-cell">
                    <button
                        className="k-primary k-button k-grid-edit-command"
                        onClick={() => edit(dataItem)}
                    >
                        Edit
                    </button>
                    {/* <button
                        className="k-button k-grid-remove-command"
                        onClick={() =>
                            remove(dataItem)
                        }
                    >
                        Remove
                    </button> */}
                </td>
            );
        }
    }
};