import React, { Component } from 'react';
import encodeUrl from 'encodeurl';
import TextAreaFieldGroup from './common/TextAreaFieldGroup';
import ListResults from './ListResults';

class LanguageDetector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      items: [],
      API_KEY: '33505b7acd732000eadb050d5e692700',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { API_KEY } = this.state;
    /* global fetch */
    fetch(`http://apilayer.net/api/detect?access_key=${API_KEY}&query=${encodeUrl(this.state.text)}`)
      .then(res => res.json())
      .catch(error => console.log(`fetch errors`, error.message))
      .then(data => {
        if (data.success) {
          
          let newItem = { 
            text: this.state.text, 
            language: data.results[0].language_name
          };
          
          this.setState({
            text: '',
            errors: { text: '' },
            items: [...this.state.items, newItem ]
          });
          
        } else {
          this.setState({
            errors: {
              text: data.error.info
            }
          });
        }
      })
      .catch(error => {
        console.log('There has been a problem with your fetch operation: ', error.message);
      });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  onReset(e) {
    this.setState({ text: '' });
  }
  
  removeItem(item, index){
    let items = this.state.items.slice();
    items.splice(index, 1);
    this.setState({ items });
  }
    
  render() {
    const { text, items, errors } = this.state;
    return (
      <div className="container">
          <div className="row">
            <div className="col-md-12 mt-4">
              <form onSubmit={ this.onSubmit }>
                <div className="form-group">
                  <TextAreaFieldGroup
                    info="*Please enter valid characters, submit to see detection results."
                    placeholder="Type in a word, words or sentences in any language."
                    name="text"
                    value={ text }
                    onChange={ this.onChange }
                    error={ errors.text }
                  />
                </div>
                <button type="submit" className="btn btn-dark mr-1">
                  Submit
                </button>
                <button type="reset" onClick={ this.onReset } className="btn btn-outline-dark">
                  Reset
                </button>
              </form>
              
              <ListResults items={ items } removeItem={ this.removeItem } />
              
            </div>
        </div>
      </div>
    );
  }
}

export default LanguageDetector;