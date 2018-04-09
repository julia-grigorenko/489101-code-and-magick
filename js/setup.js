'use strict';

var showElement = function (htmlElement) {
  htmlElement.classList.remove('hidden');
};

var getRandomInt = function (max) {
  return Math.round(Math.random() * Math.round(max));
};

var getRandomBool = function () {
  return getRandomInt(1);
};

var getRandomWizardFullName = function (wizardNames, wizardSurnames) {
  var nameIndex = getRandomInt(wizardNames.length - 1);
  var surnameIndex = getRandomInt(wizardNames.length - 1);
  var reverseOrder = getRandomBool();

  if (reverseOrder) {
    return wizardNames[nameIndex] + ' ' + wizardSurnames[surnameIndex];
  } else {
    return wizardSurnames[nameIndex] + ' ' + wizardNames[surnameIndex];
  }
};

var getRandomArrayElem = function (list) {
  var randomIndex = getRandomInt(list.length - 1);

  return list[randomIndex];
};

var getWizards = function (wizardsNumber, wizardsNames, wizardsSurnames, wizardsCoatColors, wizardsEyesColors) {
  var wizards = [];

  for (var i = 0; i < wizardsNumber; i++) {
    var wizard = {
      name: getRandomWizardFullName(wizardsNames, wizardsSurnames),
      coatColor: getRandomArrayElem(wizardsCoatColors),
      eyesColor: getRandomArrayElem(wizardsEyesColors)
    };
    wizards.push(wizard);
  }
  return wizards;
};

var renderWizard = function (wizard, template) {
  var wizardElement = template.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var createSimilarWizardsList = function (similarWizardsCount) {

  var setup = document.querySelector('.setup');
  var setupSimilar = document.querySelector('.setup-similar');

  var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();

  showElement(setup);
  showElement(setupSimilar);
  var wizards = getWizards(similarWizardsCount, names, surnames, coatColors, eyesColors);

  for (var i = 0; i < similarWizardsCount; i++) {
    fragment.appendChild(renderWizard(wizards[i], similarWizardTemplate));
  }

  similarListElement.appendChild(fragment);
};

createSimilarWizardsList(4);
