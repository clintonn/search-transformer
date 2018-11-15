// @flow

export default class SearchTransformer {
  data: Array<string>;

  constructor(data: Array<string> = ['foo', 'bar', 'baz']) {
    this.data = data;
  }

  sanitize = (
    term: string,
    format: RegExp = /\w+/gi
  ): string | typeof undefined => {
    const sanitized = term.match(format);
    if (sanitized) {
      return sanitized.join('');
    }
  };

  match = (input: string, comparator: string): boolean => {
    const sanitizedInput = this.sanitize(input);
    const sanitizedComparator = this.sanitize(comparator);
    if (sanitizedInput && sanitizedComparator) {
      return !!sanitizedComparator.match(sanitizedInput);
    }
    return false;
  };

  search = (input: string): Array<string> => {
    const results = [];
    this.data.forEach(term => {
      if (this.match(input, term)) {
        results.push(term);
      }
    });
    return results;
  };
}
