walk(document.body);

function getRandomAdj() {
  return capitalizeFirstLetter(randomChoice([
    'droning',
    'goatish',
    'infectious',
    'mammering',
    'mangled',
    'puking',
    'puny',
    'unmuzzled',
    'vain',
    'dangerous',
    'villainous',
    'warped',
    'poisonous',
    'wart-necked',
    'clueless',
    'bloviating',
    'toupéd',
    'clueless',
    'insane',
    'egotistical'
  ]));
}

function getRandomAdj2() {
  return capitalizeFirstLetter(randomChoice([
    'beef-witted',
    'full-gorged',
    'half-faced',
    'idle-headed',
    'ill-nurtured',
    'rump-fed',
    'toad-spotted',
    'tiny-fingered',
    'Cheeto-faced',
    'ferret-wearing',
    'weapons-grade',
    'thin-skinned',
    'tax-dodging',
    'narcissistic'
  ]));
}

function getRandomNoun() {
  return capitalizeFirstLetter(randomChoice([
    'hellbeast',
    'fleshbag',
    'dimwit',
    'horn-beast',
    'minnow',
    'pignut',
    'toad',
    'cocksplat',
    'shitgibbon',
    'tit',
    'doughnut',
    'spoon',
    'fucknugget',
    'apricot hellbeast',
    'numpty',
    'fucktrumpet',
    'sociopath'
  ]));
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function randomChoice(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function getRandomInsult(capitalize, choice) {
  if (!choice) choice = Math.floor(Math.random() * 2) + 1;
  var insult = '';

  switch(choice) {
    case 1:
      insult = getRandomAdj() + ' ' + getRandomNoun();
      break;
    case 2:
      insult = getRandomAdj() + ', ' + getRandomAdj2() + ' ' + getRandomNoun();
      break;
  }

  if (!!capitalize) insult = capitalizeFirstLetter(insult);
  return insult;
}

function walk(node) {
  // I stole this function from here:
  // http://is.gd/mwZp7E

  var child, next;

  switch ( node.nodeType ) {
    case 1:  // Element
    case 9:  // Document
    case 11: // Document fragment
      child = node.firstChild;
      while ( child ) {
        next = child.nextSibling;
        walk(child);
        child = next;
      }
      break;

    case 3: // Text node
      if(node.parentElement.tagName.toLowerCase() != "script") {
        handleText(node);
      }

      break;
  }
}

function handleText(textNode) {
  var v = textNode.nodeValue;

  if (v.length && (v.indexOf("Trump") !== -1 || v.indexOf("TRUMP") !== -1)) {
    v = v.replace(/\b Donald Trump\b/g, ' ' + getRandomInsult(false));
    v = v.replace(/\b Donald J. Trump\b/g, ' ' + getRandomInsult(false));
    v = v.replace(/\b Mr. Trump\b/g, ' ' + getRandomInsult(false));
    v = v.replace(/\b President Trump\b/g, ' ' + getRandomInsult(false, 2));
    v = v.replace(/\b President-elect Trump\b/g, ' ' + getRandomInsult(false, 2));

    v = v.replace(/\bDonald Trump\b/g, getRandomInsult(true));
    v = v.replace(/\bDonald J. Trump\b/g, getRandomInsult(true));
    v = v.replace(/\bMr. Trump\b/g, getRandomInsult(true));
    v = v.replace(/\bPresident Trump\b/g, getRandomInsult(true, 2));
    v = v.replace(/\bPresident-elect Trump\b/g, getRandomInsult(true, 2));

    // leave the other trumps alone
    v = v.replace(/\bIvanka Trump\b/g, 'Ivanka Trumptmp');
    v = v.replace(/\bMelania Trump\b/g, 'Melania Trumptmp');
    v = v.replace(/\bEric Trump\b/g, 'Eric Trumptmp');

    v = v.replace(/\b. Trump\b/g, '. ' + getRandomInsult(true, 1));
    v = v.replace(/\b Trump\b/g, ' ' + getRandomInsult(false, 1));
    v = v.replace(/\bTrump\b/g, getRandomInsult(true, 1));
    v = v.replace(/\bTRUMP\b/g, getRandomInsult(true, 1).toUpperCase());

    v = v.replace(/\bTrumptmp\b/g, 'Trump');
  }

  textNode.nodeValue = v;
}
