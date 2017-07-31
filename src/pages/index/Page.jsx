import React from 'react';
import ReactDOM from 'react-dom';


console.log(React);

// var CommentBox = React.createClass({
//   render: function() {
//     return (
//       <div className="commentBox">
//         Hello, world! I am a CommentBox.
//       </div>
//     );
//   }
// });

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hello:<p>hello world. <a href="http://www.react-cn.com/">react中国</a></p> };
  }
  render() {
    return (
      <div>
        {this.state.hello}
      </div>
    )
  }
}

ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);