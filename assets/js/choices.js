(function () {
  "use strict";

  /* default multi select */
  const secondElement = new Choices('#choices-multiple-default', { allowSearch: false }).setValue(['Choice 2', 'Choice 3']);

  /* multi select with remove button */
  const multipleCancelButton = new Choices(
    '#choices-multiple-remove-button',
    {
      allowHTML: true,
      removeItemButton: true,
    }
  );

  /* multi select with option groups */
  const multipleDefault = new Choices(document.getElementById('choices-multiple-groups'),
    { allowHTML: true }
  );

  /* email address only */
  const textEmailFilter = new Choices('#choices-text-email-filter', {
    allowHTML: true,
    editItems: true,
    addItemFilter: function (value) {
      if (!value) {
        return false;
      }
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const expression = new RegExp(regex.source, 'i');
      return expression.test(value);
    },
  }).setValue(['abc@hotmail.com']);

  /* passing through values */
  const textPresetVal = new Choices('#choices-text-preset-values', {
    allowHTML: true,
    items: [
      'one',
      {
        value: 'two',
        label: 'two',
        customProperties: {
          description: 'Os números são infinitos',
        },
      },
    ],
  });

  /* options added via config with no search */
  const singleNoSearch = new Choices('#choices-single-no-search', {
    allowHTML: true,
    searchEnabled: false,
    removeItemButton: true,
    choices: [
      { value: 'One', label: 'Rótulo um' },
      { value: 'Two', label: 'Rótulo dois' },
      { value: 'Three', label: 'Rótulo três' },
    ],
  }).setChoices(
    [
      { value: 'Four', label: 'Rótulo quatro' },
      { value: 'Five', label: 'Rótulo cinco' },
      { value: 'Six', label: 'Rótulo seis', selected: true },
    ],
    'value',
    'label',
    false
  );

  /* passing unique values */
  const textUniqueVals = new Choices('#choices-text-unique-values', {
    allowHTML: true,
    paste: false,
    duplicateItemsAllowed: false,
    editItems: true,
  });

})();