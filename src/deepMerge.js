const {isObject, isArray, isSameType} = require('./helpers')

module.exports = deepMerge;

function deepMerge(obj1, obj2) {
    if (!isObject(obj1) && !isArray(obj1) || !isSameType(obj1,obj2)) {
        if (isArray(obj2) || isObject(obj2)) {
            return deepCopy(obj2)
        }
        return obj2;
    }

    if (isArray(obj1)) {
        return deepMergeArrays(obj1, obj2)
    }
    return deepMergeObjects(obj1, obj2)
}

// function deepCopyArray (arr) {
//     const result = [...arr]
//
//     for (let i = 0; i < result.length; i++) {
//         if(isArray(result[i])){
//             result[i] = deepCopyArray(result[i]);
//             continue;
//         }
//         if(isObject(result[i])){
//             result[i] = deepCopyObject(result[i]);
//             continue;
//         }
//     }
//
//     return result;
// }

// function deepCopyObject (obj) {
//     const result = {...obj};
//
//     for (let i of Object.keys(obj)) {
//         if(isArray(result[i])){
//             result[i] = deepCopyArray(result[i]);
//             continue;
//         }
//         if(isObject(result[i])){
//             result[i] = deepCopyObject(result[i]);
//             continue;
//         }
//     }
//
//     return result;
// }
//refactor deep copies

function deepCopy (item) {
    if (!isArray(item) && !isObject(item)) {
        throw new TypeError(`deepCopy was called with wrong argument ${item}`)
    } //вдруг если аргумент не будет массивом или объектом ,в тестах такого нет но мало ли)

    const result = isArray(item) ? [...item] : {...item}

    for (let i of Object.keys(result)) {
        if(isArray(result[i]) || isObject(result[i]) ){
            result[i] = deepCopy(result[i]);
        }
    }

    return result;
}

function deepMergeArrays (arr1,arr2) {
    return deepCopy([...arr1,...arr2])
}

function deepMergeObjects (obj1, obj2) {
    const result = deepCopy(obj1);

    for (let key of Object.keys(obj2)) {
        if (!result.hasOwnProperty(key)) {
            if (isObject(obj2[key]) || isArray(obj2[key])) {
                result[key] = deepCopy(obj2[key])
            }

            result[key] = obj2[key]
            continue;
        }

        result[key] = deepMerge(result[key], obj2[key])
    }

    return result
}
