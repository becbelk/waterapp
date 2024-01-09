exports.deepClone = (obj) => {
    if (typeof (obj) !== 'object' || obj === null) return obj;
    //create an array or an object regarding the type of obj
    const newObject = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        const value = obj[key];
        ///recursion for every element or nested element in [obj]
        newObject = deepClone(value)
    }
    return newObject;
}
//deep copy or copyWith like Dart