import React from 'react';
 class Popular extends React.Component {
     constructor(props){
         super(props);
         this.state={
             selectedlanguage:'ALL'
         };
         this.updateLanguage=this.updateLanguage.bind(this);
     }
     updateLanguage(lang){
         this.setState(()=>{

             return{
                 selectedlanguage :lang
             };

         });
     }
     render() {
         const languages=['All','Javascript','Ruby','Java','CSS','Python'];

         return (
             <ul className='languages'>
             {
                 languages.map((lang)=>{
                     return(<li
                         style={lang===this.state.selectedlanguage ? {color:'#d0021b'}:null}
                            onClick={this.updateLanguage.bind(null,lang)}
                            key={lang}

                         >{lang}
                         </li>);

                })
            }


             </ul>
         );

     }
 }

  export default Popular;
