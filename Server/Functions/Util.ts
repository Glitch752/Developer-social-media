function removeArrayItem(array, value) {
    var i = 0;
    while (i < array.length) {
      if (array[i] === value) {
        array.splice(i, 1);
      } else {
        ++i;
      }
    }
    return array;
}

export { removeArrayItem };