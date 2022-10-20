import React, { createContext } from 'react';




class Results extends React.Component {
    state = {
        run: this.props.run,
        data:this.props.data, 
        ShowButton:true
    }
    
    SortAndDisplayResults = e =>{
        console.log('inside function')
        console.log('my props are',this.props)
        console.log('my state is',this.state)
        if (this.state.run){
            let WhiskeyCount=this.state.data.length
            const sorted=[...this.state.data].sort((a,b) => (a.VoteAverage < b.VoteAverage)? 1: -1)
            console.log('I was ran, sorted is',sorted)
            this.setState( PrevState => (
                {
                    run:PrevState.run,
                    data:sorted
                 })
            )
        }
        console.log('new state is',this.state)
     }
  
    render(){
        // console.log('props in Results',this.props)
        // console.log('state in results',this.state)
        const AllVoted = this.state.AllVoted;
        const run = this.state.run;
        return(
            <div>
                <button onClick={this.SortAndDisplayResults} id="ShowButton"> Are you Sure?</button>
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