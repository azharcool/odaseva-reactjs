import { useDispatch, useSelector } from 'react-redux';
import { parse, stringify } from 'flatted';
import { saveObjectDetails, saveAllObjectList } from '../../redux/dataSlice';
import objectListJson from '../../data/objectsList/objectsList.json';

function useExternalFunction() {
    const newObjectsState = useSelector(state => state.newObjectsJsonArr);
    const dispatch = useDispatch();

    const storeObjectDetails = async (nKey) => {
        let isAvailable = newObjectsState.filter((i) => i.id === nKey);
        if (isAvailable.length > 0) {
            return isAvailable[0].value;
        }

        const objectDetails = await import(`../../data/newsObjects/${nKey}.json`);
        let cloneNodeList = parse(stringify(objectDetails));
        const nodeObject = cloneNodeList.default;
        let temp = {};
        temp.id = nKey;
        temp.value = nodeObject;
        dispatch(saveObjectDetails(temp))
        return nodeObject;
    }

    const storeObjectList = () => {
        const cloneObjectListJson = parse(stringify(objectListJson));
        dispatch(saveAllObjectList(cloneObjectListJson));
    };

    return { storeObjectDetails, storeObjectList };
}

export default useExternalFunction;