import SearchTransformer from './searchTransformer';

describe('SearchTransformer', () => {
  let st;
  beforeEach(() => {
    jest.clearAllMocks();
    st = new SearchTransformer();
  });

  describe('Matching', () => {
    it('Returns false when default .match is called with non-alphanumeric characters', () => {
      expect(st.match('%$%#%^', 'TestInput')).toEqual(false);
    });

    it('Returns true when fed a partial input to a matching comparator', () => {
      expect(
        st.match('Ama', 'Amazon will literally destroy the 7 train')
      ).toEqual(true);
    });
  });

  describe('Sanitization', () => {
    it('Properly returns undefined when comparing an invalid input with arbitrary regex formats', () => {
      expect(st.sanitize('foo', /\d+/)).toEqual(undefined);
    });

    it('Properly returns a sanitized string when comparing a valid input with an arbitrary regex format', () => {
      expect(st.sanitize('foo-bar')).toEqual('foobar');
    });
  });

  describe('Search functionality', () => {
    it('Matches against a default set of data when fed a user input', () => {
      expect(st.search('foo')).toEqual(['foo']);
    });

    it('Matches against partial user inputs', () => {
      expect(st.search('ba')).toEqual(['bar', 'baz']);
    });

    it('Matches against a custom set of data passed to the constructor', () => {
      const mock = new SearchTransformer([
        'sum',
        'es',
        'est',
        'sumus',
        'estis',
        'sunt'
      ]);
      expect(mock.search('su')).toEqual(['sum', 'sumus', 'sunt']);
    });
  });
});
