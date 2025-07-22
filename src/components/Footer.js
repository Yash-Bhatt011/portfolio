import React, { Component } from "react";

class Footer extends Component {
  render() {
    let networks = [];
    if (this.props.sharedBasicInfo && this.props.sharedBasicInfo.social) {
      networks = this.props.sharedBasicInfo.social.map(function (network) {
        return (
          <span key={network.name} className="m-4">
            <a href={network.url} target="_blank" rel="noopener noreferrer">
              <i className={network.class}></i>
            </a>
          </span>
        );
      });
    }

    return (
      <footer>
        <div className="col-md-12">
          <div className="social-links" style={{transition: "all 0.3s ease"}}>
            {networks.map(network => (
              React.cloneElement(network, {
                onMouseEnter: e => e.currentTarget.style.color = "#ff6f61",
                onMouseLeave: e => e.currentTarget.style.color = "inherit"
              })
            ))}
          </div>

          <div className="copyright py-4 text-center">
            <div className="container">
              <small>
                Copyright &copy;{" "}
                {this.props.sharedBasicInfo
                  ? this.props.sharedBasicInfo.name
                  : "???"}
              </small>
            </div>
          </div>
          <div style={{textAlign: "center", marginTop: "10px"}}>
            <a href="mailto:your.email@example.com" style={{color: "#ff6f61", textDecoration: "none", fontWeight: "bold"}}>
              Contact Me
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
