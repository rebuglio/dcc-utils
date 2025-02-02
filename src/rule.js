const fs = require('fs');
const certLogicJs = require('certlogic-js');

class Rule {
  static fromFile(filePath, external = {}) {
    const rule = new Rule();
    rule._external = external;
    rule._payload = JSON.parse(fs.readFileSync(filePath));
    return rule;
  }

  get payload() {
    return this._payload;
  }

  getDescription(language = 'en') {
    const description = this._payload.Description.find((element) => element.lang === language);
    return description ? description.desc : null;
  }

  evaluateDCC(dcc, external = {}) {
    const options = { ...this._external, ...external };
    return certLogicJs.evaluate(this.payload.Logic, {
      payload: dcc.payload,
      external: options,
    });
  }
}

module.exports = Rule;
