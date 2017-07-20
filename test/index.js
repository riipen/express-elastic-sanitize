// Node modules
import { assert } from 'chai';

// Module to test
import sanitize from '../src/index';

describe('sanitize', () => {
  const req = {};
  const res = {};
  const next = () => {};

  it('should escape all special characters', () => {
    req.query = {
      input: '+ - = && || > < ! ( ) { } [ ] ^ " ~ * ? : \\ / AND OR NOT',
    };

    sanitize(req, res, next);

    assert.equal(req.query.input, '\\+\\ \\-\\ \\=\\ \\&&\\ \\||\\ \\>\\ \\<\\ \\!\\ \\(\\ \\)\\ \\{\\ \\}\\ \\[\\ \\]\\ \\^\\ \\"\\ \\~\\ \\*\\ \\?\\ \\:\\ \\\\\\ \\/\\ \\A\\N\\D\\ \\O\\R\\ \\N\\O\\T');
  });

  it('should escape all characters in context', () => {
    req.params = {
      input: 'AND there! are? (lots of) char*cters 2 ^escape!',
    };

    sanitize(req, res, next);

    assert.equal(req.params.input, '\\A\\N\\D\\ there\\!\\ are\\?\\ \\(lots\\ of\\)\\ char\\*cters\\ 2\\ \\^escape\\!');
  });

  it('should escape repeated special characters', () => {
    req.body = {
      input: '&& || && || > < ! > < ! AND OR NOT NOT OR AND',
    };

    sanitize(req, res, next);

    assert.equal(req.body.input, '\\&&\\ \\||\\ \\&&\\ \\||\\ \\>\\ \\<\\ \\!\\ \\>\\ \\<\\ \\!\\ \\A\\N\\D\\ \\O\\R\\ \\N\\O\\T\\ \\N\\O\\T\\ \\O\\R\\ \\A\\N\\D');
  });
});
