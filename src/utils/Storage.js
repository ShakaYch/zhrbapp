const $storage =  {}
//localStorage
$storage.getLocal = function (name) {
    return JSON.parse(localStorage.getItem(name))
}

$storage.setLocal = function (name, val) {
    localStorage.setItem(name, JSON.stringify(val))
}

$storage.addLocal = function (name, addVal) {
    let oldVal = $storage.getLocal(name)
    console.log(oldVal)
    let newVal = oldVal.concat(addVal)
    $storage.setLocal(name, newVal)
}

//sessionStorage
$storage.getSession = function (name) {
    return JSON.parse(sessionStorage.getItem(name))
}

$storage.setSession = function (name, val) {
    sessionStorage.setItem(name, JSON.stringify(val))
}

$storage.removeSession = function (name) {
    sessionStorage.removeItem(name)
}

export default $storage