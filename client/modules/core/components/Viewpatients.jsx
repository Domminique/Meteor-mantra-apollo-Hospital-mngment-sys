import React from 'react';

export default class Viewpatients extends React.Component {
  constructor(props) {
    super(props);


  }

  render() {
    const {userisDoctor} = this.props;
    const {patients} = this.props;
    const {clearingPatient} = this.props;

    const {user} = this.props;
    // are patients there or not
    const renderPatients = (patients) => {
      if (patients && patients.length > 0) {
        return (
    			<div>
    				{patients.map(({
              _id,
              name
            }) => (
              <div key={_id}>
                	<li>{name}</li>
                  <button onClick={function(){
                      const patientId = _id;
                      clearingPatient({patientId});
                  }}>Clear Patient</button>
              </div>

     				))}
    			</div>
          );
      } else {
        return (
          <li>There are no Patients Add a first one.. Remember only receptionists can add patients</li>
        )
      }
    };


    return (
      <div>


            {
              user

              ?    <section>
                      {renderPatients(patients)}
                    </section>

              : ''
            }


      </div>
    );
  }
}
