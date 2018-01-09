export const removeStopWords = query => {
  const stopWords = {
    a: true,
    able: true,
    about: true,
    across: true,
    after: true,
    all: true,
    almost: true,
    also: true,
    am: true,
    among: true,
    an: true,
    and: true,
    any: true,
    are: true,
    as: true,
    at: true,
    be: true,
    because: true,
    been: true,
    but: true,
    by: true,
    can: true,
    cannot: true,
    could: true,
    dear: true,
    did: true,
    do: true,
    does: true,
    either: true,
    else: true,
    ever: true,
    every: true,
    for: true,
    from: true,
    get: true,
    got: true,
    had: true,
    has: true,
    have: true,
    he: true,
    her: true,
    hers: true,
    him: true,
    his: true,
    how: true,
    however: true,
    i: true,
    if: true,
    in: true,
    into: true,
    is: true,
    it: true,
    its: true,
    just: true,
    least: true,
    let: true,
    like: true,
    likely: true,
    may: true,
    me: true,
    might: true,
    most: true,
    must: true,
    my: true,
    neither: true,
    no: true,
    nor: true,
    not: true,
    of: true,
    off: true,
    often: true,
    on: true,
    only: true,
    or: true,
    other: true,
    our: true,
    own: true,
    rather: true,
    said: true,
    say: true,
    says: true,
    she: true,
    should: true,
    since: true,
    so: true,
    some: true,
    than: true,
    that: true,
    the: true,
    their: true,
    them: true,
    then: true,
    there: true,
    these: true,
    they: true,
    this: true,
    tis: true,
    to: true,
    too: true,
    twas: true,
    us: true,
    wants: true,
    was: true,
    we: true,
    were: true,
    what: true,
    when: true,
    where: true,
    which: true,
    while: true,
    who: true,
    whom: true,
    why: true,
    will: true,
    with: true,
    would: true,
    yet: true,
    you: true,
    your: true,
    "ain't": true,
    "aren't": true,
    "can't": true,
    "could've": true,
    "couldn't": true,
    "didn't": true,
    "doesn't": true,
    "don't": true,
    "hasn't": true,
    "he'd": true,
    "he'll": true,
    "he's": true,
    "how'd": true,
    "how'll": true,
    "how's": true,
    "i'd": true,
    "i'll": true,
    "i'm": true,
    "i've": true,
    "isn't": true,
    "it's": true,
    "might've": true,
    "mightn't": true,
    "must've": true,
    "mustn't": true,
    "shan't": true,
    "she'd": true,
    "she'll": true,
    "she's": true,
    "should've": true,
    "shouldn't": true,
    "that'll": true,
    "that's": true,
    "there's": true,
    "they'd": true,
    "they'll": true,
    "they're": true,
    "they've": true,
    "wasn't": true,
    "we'd": true,
    "we'll": true,
    "we're": true,
    "weren't": true,
    "what'd": true,
    "what's": true,
    "when'd": true,
    "when'll": true,
    "when's": true,
    "where'd": true,
    "where'll": true,
    "where's": true,
    "who'd": true,
    "who'll": true,
    "who's": true,
    "why'd": true,
    "why'll": true,
    "why's": true,
    "won't": true,
    "would've": true,
    "wouldn't": true,
    "you'd": true,
    "you'll": true,
    "you're": true,
    "you've": true,
  };

  // Break up string into an array of words
  const wordArr = query.match(/\w+('\w+)?/g);

  const goodWords = wordArr.reduce((acc, word) => {
    if (!stopWords[word.trim()]) {
      acc.push(word);
    }

    return acc;
  }, []);

  return goodWords.length > 1 ? goodWords.join(' ') : query;
};