function useRecursive() {

    const callRecursive = (root, pushEle) => {
        if (root?.parent.length > 0) {
            root.parent.map((i) => {
                pushEle.push(i)
                callRecursive(i, pushEle);
                return false;
            });
        };

        if (root?.children.length > 0) {
            root.children.map((i) => {
                pushEle.push(i)
                callRecursive(i, pushEle);
                return false;
            })
        };
        return pushEle;
    };

    const getObject = (query, rootArr, nodeId) => {
        let finalObj = {};
        if (query === 'Root') {
            let findNodeId = rootArr.find(i => i.nodeId === nodeId);
            return findNodeId;
        } else {
            rootArr.map((item) => {
                let node = item.nodeList;
                let findNodeId = node.find(i => i.nodeId === nodeId);
                if (findNodeId) {
                    finalObj = findNodeId;
                    return finalObj;
                }
                return finalObj;
            });
        };
        return finalObj;
    }
    const collapseNodes = (nodeId, rootArr, activeNodeArr, query) => {
        let finalArr = [], allNodeIdArr = [], duplicateArr = [], pushList = [];
        allNodeIdArr.push(nodeId);
        let getO = getObject(query, rootArr, nodeId);
        let getNodes = callRecursive(getO, pushList);

        getNodes.map((i) => {
            allNodeIdArr.push(i.nodeId);
            return false;
        });
        activeNodeArr.map((i) => {
            let check = allNodeIdArr.includes(i);
            if (check) {
                duplicateArr.push(i);
            };
            return false;
        });

        activeNodeArr.map((i) => {
            let check = duplicateArr.includes(i);
            if (!check) {
                finalArr.push(i);
            };
            return false;
        });

        return finalArr;
    };



    return { callRecursive, collapseNodes };
}

export default useRecursive;