import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Account from "components/Account/Account";
import Chains from "components/Chains";
import TokenPrice from "components/TokenPrice";
import ERC20Balance from "components/ERC20Balance";
import ERC20Transfers from "components/ERC20Transfers";
import DEX from "components/DEX";
import NFTBalance from "components/NFTBalance";
import Wallet from "components/Wallet";
import { Layout, Tabs } from "antd";
import "antd/dist/antd.css";
import NativeBalance from "components/NativeBalance";
import "./style.css";
import QuickStart from "components/QuickStart";
import Contract from "components/Contract/Contract";
import Text from "antd/lib/typography/Text";
import Ramper from "components/Ramper";
import MenuItems from "./components/MenuItems";
const { Header, Footer } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "130px",
    padding: "10px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
};
const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } = useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Router>
        <Header style={styles.header}>
          <Logo />
          <MenuItems />
          <div style={styles.headerRight}>
            <Chains />
            <TokenPrice
              address="0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
              chain="eth"
              image="https://cloudflare-ipfs.com/ipfs/QmXttGpZrECX5qCyXbBQiqgQNytVGeZW5Anewvh2jc4psg/"
              size="40px"
            />
            <NativeBalance />
            <Account />
          </div>
        </Header>

        <div style={styles.content}>
          <Switch>
            <Route exact path="/quickstart">
              <QuickStart isServerInfo={isServerInfo} />
            </Route>
            <Route path="/wallet">
              <Wallet />
            </Route>
            <Route path="/1inch">
              <Tabs defaultActiveKey="1" style={{ alignItems: "center" }}>
                <Tabs.TabPane tab={<span>Ethereum</span>} key="1">
                  <DEX chain="eth" />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span>Binance Smart Chain</span>} key="2">
                  <DEX chain="bsc" />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span>Polygon</span>} key="3">
                  <DEX chain="polygon" />
                </Tabs.TabPane>
              </Tabs>
            </Route>
            <Route path="/erc20balance">
              <ERC20Balance />
            </Route>
            <Route path="/onramp">
              <Ramper />
            </Route>
            <Route path="/erc20transfers">
              <ERC20Transfers />
            </Route>
            <Route path="/nftBalance">
              <NFTBalance />
            </Route>
            <Route path="/contract">
              <Contract />
            </Route>
            <Route path="/">
              <Redirect to="/quickstart" />
            </Route>
            <Route path="/ethereum-boilerplate">
              <Redirect to="/quickstart" />
            </Route>
            <Route path="/nonauthenticated">
              <>Please login using the "Authenticate" button</>
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer style={{ textAlign: "center" }}>
      <Text style={{ display: "block" }}>
          ⭐️ This is WChain, we are blockchain/NFT fans and promoters, every creative ideas makes us very happy!
        </Text>

        <Text style={{ display: "block" }}>
          🙋 You have questions? Ask us on the {""}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:service@em8566.nft.kozow.com"
          >
            WChain Service
          </a>
        </Text>

        <Text style={{ display: "block" }}>
          📖 This template is from Moralis. Read more about{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://moralis.io"
          >
            Moralis
          </a>
        </Text>
      </Footer>
    </Layout>
  );
};

export const Logo = () => (
<div style={{ display: "flex" }}>
    <svg
      width="60"
      height="38"
      viewBox="0 0 60 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
<path fill="#fffdfb" d="M -0.5,-0.5 C 19.5,-0.5 39.5,-0.5 59.5,-0.5C 59.5,12.1667 59.5,24.8333 59.5,37.5C 39.5,37.5 19.5,37.5 -0.5,37.5C -0.5,24.8333 -0.5,12.1667 -0.5,-0.5 Z"/>
<path fill="#ffc91e" d="M 14.5,29.5 C 9.48421,31.4162 6.98421,29.7496 7,24.5C 12.5107,18.9906 18.344,13.8239 24.5,9C 23.5704,8.0093 22.4038,7.5093 21,7.5C 15.7375,8.86528 10.5708,10.5319 5.5,12.5C 4.23088,10.3052 4.23088,8.13853 5.5,6C 7.95588,4.3814 10.4559,3.8814 13,4.5C 18.2427,2.0024 23.4093,2.0024 28.5,4.5C 29.4847,6.09833 29.6514,7.76499 29,9.5C 24.1347,14.7 18.9681,19.5334 13.5,24C 14,24.1667 14.5,24.3333 15,24.5C 23.3869,19.4514 31.2203,13.6181 38.5,7C 40.3453,5.87201 42.3453,5.37201 44.5,5.5C 44.6567,6.87344 44.49,8.20677 44,9.5C 38.7538,14.0752 34.2538,19.2419 30.5,25C 31,25.5 31.5,26 32,26.5C 35.5435,25.3118 38.7102,23.4784 41.5,21C 46.1703,16.1864 50.1703,11.0198 53.5,5.5C 54.5,5.83333 55.1667,6.5 55.5,7.5C 51.5581,17.906 44.5581,25.406 34.5,30C 30.3587,31.2637 27.692,29.9304 26.5,26C 27.2799,23.3215 28.1133,20.8215 29,18.5C 24.0085,22.0657 19.1752,25.7323 14.5,29.5 Z"/>
<path fill="#f2e9c0" d="M 28.5,33.5 C 27.3406,34.4558 26.1739,35.4558 25,36.5C 22.1297,36.3071 19.2963,35.9738 16.5,35.5C 18.7243,31.8962 21.7243,30.2295 25.5,30.5C 24.4104,31.6086 24.4104,32.6086 25.5,33.5C 26.6868,32.3473 27.6868,32.3473 28.5,33.5 Z"/>
<path fill="#f5edcb" d="M 14.5,29.5 C 19.57,30.3617 19.57,31.8617 14.5,34C 14.8333,34.3333 15.1667,34.6667 15.5,35C 13.3225,36.2022 10.9892,36.7022 8.5,36.5C 8.35055,35.448 8.51722,34.448 9,33.5C 10.8121,32.0229 12.6455,30.6896 14.5,29.5 Z"/>
<path fill="#eee2ad" d="M 38.5,31.5 C 39.2216,31.9175 39.7216,32.5842 40,33.5C 40.8928,32.2888 41.7261,32.2888 42.5,33.5C 41.6495,36.6124 40.4828,36.9458 39,34.5C 38,35.1667 37,35.8333 36,36.5C 36.0579,34.5646 36.8912,32.8979 38.5,31.5 Z"/>
<path fill="#f1e6b6" d="M 28.5,33.5 C 30.2049,30.7131 31.3716,31.0465 32,34.5C 32.8373,32.9926 34.0039,32.4926 35.5,33C 34.3816,34.0736 33.3816,35.2402 32.5,36.5C 31.5,35.1667 30.5,35.1667 29.5,36.5C 28.6143,35.675 28.281,34.675 28.5,33.5 Z"/>
    </svg>
</div>
);

export default App;
