import React, { useState } from 'react';
//import { sampleProducts } from '../common/sample-products';
import { MyCommandCell } from './myCommandCell.jsx';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { process } from '@progress/kendo-data-query';
import { sampleQuarters } from '../common/sample-quarters';

const ManageQuarter = (props) => {
    const editField = "inEdit";

    // const initialDataState = {
    //     skip: 0,
    //     take: 10,
    //   };

    //const [data, setData] = useState(sampleProducts);
    const [data, setData] = useState(sampleQuarters);
    const [dataState, setDataState ] = useState({skip: 0, take: 10 })
    //const [page, setPage] = React.useState(initialDataState);
    const generateId = data => data.reduce((acc, current) => Math.max(acc, current.QuarterID), 0) + 1;

    const removeItem = (data, item) => {
        let index = data.findIndex(p => p === item || item.QuarterID && p.QuarterID === item.QuarterID);
        if (index >= 0) {
            data.splice(index, 1);
        }
    }


    const enterEdit = (dataItem) => {
        setData(data.map(item =>
            item.QuarterID === dataItem.QuarterID ?
                { ...item, inEdit: true } : item
        ));
    }

    const remove = (dataItem) => {

        const newData = [...data];
        removeItem(newData, dataItem);
        removeItem(sampleQuarters, dataItem);
        setData([...newData]);
    }

    const add = (dataItem) => {
        dataItem.inEdit = undefined;
        dataItem.QuarterID = generateId(sampleQuarters);

        sampleQuarters.unshift(dataItem);
        setData([...data])
    }

    const discard = (dataItem) => {
        const newData = [...data];
        removeItem(newData, dataItem);

        setData(newData);
    }

    const update = (dataItem) => {
        const newData = [...data]
        const updatedItem = { ...dataItem, inEdit: undefined };

        updateItem(newData, updatedItem);
        updateItem(sampleQuarters, updatedItem);

        setData(newData);
    }

    const cancel = (dataItem) => {
        const originalItem = sampleQuarters.find(p => p.QuarterID === dataItem.QuarterID);
        const newData = data.map(item => item.QuarterID === originalItem.QuarterID ? originalItem : item);

        setData(newData);
    }

    const updateItem = (data, item) => {
        let index = data.findIndex(p => p === item || (item.QuarterID && p.QuarterID === item.QuarterID));
        if (index >= 0) {
            data[index] = { ...item };
        }
    }

    const itemChange = (event) => {
        const newData = data.map(item =>
            item.QuarterID === event.dataItem.QuarterID ?
                { ...item, [event.field]: event.value } : item
        );
        setData(newData);
    }

    const addNew = () => {
        const newDataItem = { inEdit: true, Discontinued: false };
        setData([newDataItem, ...data]);
    }

    const cancelCurrentChanges = () => {
        setData([...sampleQuarters]);
    }

    // const pageChange = (event) => {
    //     setPage(event.page);
    //   };
    let CommandCell = MyCommandCell({
        edit: enterEdit,
        remove: remove,

        add: add,
        discard: discard,

        update: update,
        cancel: cancel,

        editField: editField
    });

    const hasEditedItem = data.some(p => p.inEdit);

    return (
        <div className="container-fluid">
            <div className='row my-4'>
                {/* <div className='col-12 col-lg-9 border-right'> */}
                    <Grid
                        data={process(data, dataState)}
                        onItemChange={itemChange}
                        editField={editField}
                        take={10}
                        pageable // uncomment to enable paging
                        //onPageChange={pageChange}
                        // sortable // uncomment to enable sorting
                        // filterable // uncomment to enable filtering
                         onDataStateChange={(e) => setDataState(e.dataState)} // uncomment to enable data operations
                        // {...dataState} // uncomment to enable data operations
                    >
                        <GridToolbar>
                            <button
                                title="Add new"
                                className="k-button k-primary"
                                onClick={addNew}
                            >
                                Add new
                </button>
                            {hasEditedItem && (
                                <button
                                    title="Cancel current changes"
                                    className="k-button"
                                    onClick={cancelCurrentChanges}
                                >
                                    Cancel current changes
                    </button>
                            )}
                        </GridToolbar>
                        {/* <Column field="QuarterID" title="Id" width="150px" editable={false} isAccessible = {false}/> */}
                        <Column field="QuarterName" title="Quarter Name" width="150px"/>
                        <Column field="StartDate" title="Start Date" width="150px" editor="date"  editable={false} format="{0: yyyy-MM-dd HH:mm:ss}" />
                        <Column field="EndDate" title="End Date" width="150px" editor="date"  editable={false}/>
                        <Column field="bonds" title="bonds" width="100px" editor="numeric" editable={true}/>
                        <Column field="Deals" title="Deals" width="100px" editor="numeric" />
                        <Column field="BusinessRuleAppyTimeStamp" title="Runtimestamp" width="150px" editor="date"  editable={false}/>
                        <Column field="InputChangeComment" title="Change Comment" width="250px" editor="text" />
                        <Column field="CreatedBy" title="Created By" width="150px" editor="text" />
                       <Column field="CreateTimeStamp" title="Created Date" width="150px" editor="date"  editable={false}/>
                        <Column cell={CommandCell} width="240px" />
                    </Grid>
                </div>
        </div>
    );
}

export default ManageQuarter;