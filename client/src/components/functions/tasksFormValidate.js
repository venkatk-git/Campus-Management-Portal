const tasksFormValidate = (
  name,
  category,
  location,
  eta,
  staffsCount,
  date
) => {
  let errorNote = [];
  if (!name || name.value == undefined) errorNote.push("name");
  if (!category || category.value == undefined) errorNote.push("category");
  if (!location || location.value == undefined) errorNote.push("location");
  if (!eta || eta.value == undefined) errorNote.push("eta");
  if (!staffsCount || staffsCount.value == undefined)
    errorNote.push("staffsCount");
  if (!date || date.value == undefined) errorNote.push("date");
  return errorNote;
};

export default tasksFormValidate;
