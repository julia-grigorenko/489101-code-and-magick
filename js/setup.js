'use strict';

var showElement = function (htmlElement) {
  htmlElement.classList.remove('hidden');
};

var getRandomInt = function (max) {
  return Math.round(Math.random() * Math.round(max));
};

var getRandomWizardFullName = function (wizardNames, wizardSurnames) {
  return getRandomInt(1) ? wizardNames[getRandomInt(wizardNames.length - 1)] + ' ' + wizardSurnames[getRandomInt(wizardSurnames.length - 1)] :
    wizardSurnames[getRandomInt(wizardSurnames.length - 1)] + ' ' + wizardNames[getRandomInt(wizardNames.length - 1)];
};

var getWizards = function (wizardsNumber, getWizardsNames, getWizardsSurnames, getWizardsCoatColors, getWizardsEyesColors) {
  var wizards = [];

  for (var i = 0; i < wizardsNumber; i++) {
    wizards[i] = {};
    wizards[i].name = getRandomWizardFullName(getWizardsNames, getWizardsSurnames);
    wizards[i].coatColor = getWizardsCoatColors[getRandomInt(getWizardsCoatColors.length - 1)];
    wizards[i].eyesColor = getWizardsEyesColors[getRandomInt(getWizardsEyesColors.length - 1)];
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

var createSimilarWizardsList = function (SimilarWizardsNumber) {

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
  var wizards = getWizards(SimilarWizardsNumber, names, surnames, coatColors, eyesColors);

  for (var i = 0; i < SimilarWizardsNumber; i++) {
    fragment.appendChild(renderWizard(wizards[i], similarWizardTemplate));
  }

  similarListElement.appendChild(fragment);
};

createSimilarWizardsList(4);
