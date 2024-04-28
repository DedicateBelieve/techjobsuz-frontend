export function classNames(className, objectClasses, additions) {
    let classes = []

    if(!className) {
        return ""
    }

    if(Array.isArray(className)) {
        classes = className
    }
    else if(className.constructor === Object) {
        if(className && Object.entries(className).length) {
            classes.push(
                ...Object.entries(className)
                    .filter(([_, value]) => Boolean(value))
                    .map(([name]) => name)
            )
        }

        if(objectClasses && objectClasses.length) {
            classes.push(...objectClasses)
        }
    }
    else {
        if(className.constructor === String) {
            classes.push(className)
        }

        if(objectClasses && Object.entries(objectClasses).length) {
            classes.push(
                ...Object.entries(objectClasses)
                    .filter(([_, value]) => Boolean(value))
                    .map(([name]) => name)
            )
        }

        if(additions && additions.length) {
            classes.push(...additions)
        }

    }

    return classes.join(" ")
}
