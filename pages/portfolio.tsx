import  React from 'react';

import Layout from '../components/Layout';

import './portfolio.scss';

type PortfolioProps = {
  portfolio: any
};

type DeviceType = 'desktop'|'mobile';

type PortfolioState = {
  activePages: number[];
  activeDevices: DeviceType[];
  fullscreenSite: number|null;
}

export default class extends React.Component<PortfolioProps>{
  state: PortfolioState;

  static async getInitialProps() {
    return {
      portfolio: await import('../src/portfolio.json')
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      activePages: this.props.portfolio.sites.map(site => 0),
      activeDevices: this.props.portfolio.sites.map(site => 'desktop'),
      fullscreenSite: null
    };
  }

  changePage(siteIndex: number, pageIndex: number) {
    const activePages = [...this.state.activePages];

    activePages[siteIndex] = pageIndex;

    this.setState({ activePages });
  }

  toggleFullscreen(siteIndex: number) {
    this.setState({ fullscreenSite: siteIndex });
  }

  changeDevice(siteIndex: number, device: DeviceType) {
    const activeDevices = [...this.state.activeDevices];

    activeDevices[siteIndex] = device;

    this.setState({ activeDevices } );
  }

  render() {
    return (
      <Layout>
        <section className={`portfolio ${typeof this.state.fullscreenSite === 'number' ? 'fullscreen' : ''}`}>
          <div className='sites'>
            {this.props.portfolio.sites.map((site, siteIndex) => (
              <div
                key={siteIndex}
                className={`site ${this.state.fullscreenSite === siteIndex ? 'fullscreen' : ''}`}
              >
                <h1>{site.title}</h1>
                <p>{site.description}</p>

                {site.pages.map((page, pageIndex) => (
                  <div
                    key={pageIndex}
                    className={`page ${this.state.activePages[siteIndex] === pageIndex ? 'active' : ''}`}
                    onClick={() => this.toggleFullscreen(siteIndex)}
                  >
                    {page.screenshots.map((screenshot, screenshotIndex) => (
                      <div
                        key={screenshotIndex}
                        className={`screenshot ${screenshot.device} ${this.state.activeDevices[siteIndex] === screenshot.device ? 'active' : ''}`}
                        onClick={() => this.changeDevice(siteIndex, screenshot.device)}
                      >
                        <div className='inner'>
                          <img src={`/static/images/portfolio/${screenshot.path}`}/>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}

                {site.pages.length > 1 &&
                  <nav>
                    {site.pages.map((page, index) => (
                      <button key={index} onClick={() => this.changePage(siteIndex, index)}>{page.title}</button>
                    ))}
                  </nav>
                }
              </div>
            ))}
          </div>
          <button className='close' onClick={() => this.toggleFullscreen(null)}>X</button>
        </section>
      </Layout>
    );
  }
};
