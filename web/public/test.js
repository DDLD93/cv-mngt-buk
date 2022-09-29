function oddNumbers(l, r) {
    let arr = []
for (let index = 0; index < r; index++) {
    if(index%2!=0) arr.push(index)
}
console.log(arr)
}

oddNumbers(1,10)