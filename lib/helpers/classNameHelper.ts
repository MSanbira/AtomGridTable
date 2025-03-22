export const getClasses = (classesObj: { [key: string]: boolean }, addedClasses: string = "") => {
  const classes = Object.keys(classesObj)
    .filter((key) => classesObj[key])
    .join(" ");

  return `${classes} ${addedClasses}`;
};
