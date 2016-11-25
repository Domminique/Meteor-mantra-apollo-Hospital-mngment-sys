import React from 'react';

export default class Createpatient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: ''};

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = this.state.name;
    const {createPatient} = this.props;
    createPatient({name});
    this.setState({name: ''});
  }

  render() {
    const { isReceptionist } = this.props;

    const {user} = this.props;

    const {error} = this.props;
    return (
      // the create patient list
      <div>

        {/* a user can only enter a patient if he or she is a receptionist */}

      {
        user

         ?       <section>
                   {
                     isReceptionist
                       ?      <form onSubmit={this.handleSubmit}>
                                 <h3>Receptionist desk</h3>
                                   <label>
                                     Patient's name:
                                     <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                                     <div style={{height: 50}}/>
                                   </label>
                                   <input type="submit" value="Create Patient" />
                                 </form>
                       : <h4 style={{textAlign: 'center', color: 'grey'}}>Clear some patients.. Doctor's task only</h4>
                   }
                 </section>
         : null
      }


      </div>
    );
  }
}
