import objectsList from '../data/objectsList/objectsList.json';

const SAVE_ALL_OBJ = 'SAVE_ALL_OBJ';
const NEW_OBJ = 'NEW_OBJ';

const saveAllObjectList = () => {
    return {
        type: SAVE_ALL_OBJ,
        payload: objectsList,
    }
};

const storeObjDetail = nKey => async (dispatch, getState) => {
    try {
        let newObjectArr = getState().newObjectsJsonArr;
        let isAvailable = newObjectArr.filter((i) => i.id == nKey);
        if (isAvailable.length > 0) {
            return isAvailable[0].value;
        }

        const response = await import(`../data/newsObjects/${nKey}.json`);
        const responseJson = response.default;
        let cloneNodeList = JSON.parse(JSON.stringify(responseJson));
        let temp = {};
        temp.id = nKey;
        temp.value = cloneNodeList;
        newObjectArr.push(temp);
        dispatch({ type: NEW_OBJ, payload: newObjectArr });
        return cloneNodeList;
    } catch (error) {
        console.log('error', error)
    }
}


export {
    SAVE_ALL_OBJ,
    NEW_OBJ,
    saveAllObjectList,
    storeObjDetail,
}