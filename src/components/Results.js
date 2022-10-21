import WhiskeyResults from './WhiskeyResults';
import React, { createContext } from 'react';
import WhiskeyDetails from './WhiskeyDetails';




class Results extends React.Component {
    state = {
        data:this.props.data,
        details:'',
        showDetails:false
    }
    ShowDetails = Whiskey =>{
        this.setState(
            prevState =>(
            {
              data:this.props.data,
              showDetails:true,
              details:Whiskey
            }) 
        )   
    }
  
    render(){
        // console.log('Results State is ',this.state)
        const ResultItems = this.props.data.map((d, i) => {
            return (
              <WhiskeyResults
                result={d}
                key={i}
                mykey={i}
                ShowDetails={this.ShowDetails}
              />
            );
          });
        let DetailList;
        let DetailHeader;
        if (this.state.showDetails){
            DetailHeader= <tr className='DetailHeader'><th>Vote</th><th>Voter name <br></br>(if given)</th><th>Notes<br></br> (if given)</th></tr>
            DetailList = this.state.details.votes.map((d, i) => {
                return (
                    <WhiskeyDetails
                        voteDetail={d}
                        key={i}
                        mykey={i}
                    />
                );
            });
        } else {
            DetailHeader=''
            DetailList=''
        }
        
        return(
            <div>
            
            <div className="results-list">{ResultItems}</div>
            <table>
                {DetailHeader}
                {DetailList}
            </table>
            </div>
        )
        }
    }


// const Results = (props) => {
//     const Results = props.data.map((d, i) => {
//         return (
//           // console.log('array of objects in todoList'),
//           // console.log (d),
//           // console.log(i),
//           // console.log('myprops in WhiskeyList'),
//           // console.log(props),
//           <Result
            
//             todo={d}
//             key={i}
//             mykey={i}
            
//           />
//          //,console.log('end of loop?')
//         );
//       });
// }


export default Results;