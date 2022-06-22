import { h, Component } from "preact";
import { useState, useContext } from "preact/hooks";
import { ContractProvider } from "../components/ContractContext";
import { Navigation } from "../components/Navigation";
import { MyPlanetsView } from "./MyPlanetsView";
import { MyListingsView } from "./MyListingsView";
import { MyOrdersView } from "./MyOrdersView";
import { MarketView } from "./MarketView";
import { GuideView } from "./GuideView";
import { MySignerProvider } from "../components/SignerContext";
import { MyTransactionProvider } from "../components/MyTransactionContext";
import { Contract, Signer, Event as EthersEvent } from "ethers";
import { Listing, ListingsProvider } from "../components/MyListingsContext";
import EthConnection from "@df_client/src/Backend/Network/EthConnection";
import { ConnectionProvider } from "../components/ConnectionContext";

type AppViewProps = {
	contract: { market: Contract; };
	signer: Signer;
	txs: EthersEvent[];
	listings: Listing[];
	connection: EthConnection;
};

export function AppView ({ contract, signer, txs, listings, connection }: AppViewProps) {
	const [ activeTabId, setActiveTab ] = useState(0);

	return (
		// contractsProvider has `game` and `market` contracts
		<ContractProvider value={contract}>
			<ConnectionProvider value={connection}>
				<MySignerProvider signer={signer}>
					<MyTransactionProvider txs={txs}>
						<ListingsProvider listings={listings}>
							<Navigation
								tabs={[
									{ name: "Market", TabContent: MarketView },
									{ name: "My Listings", TabContent: MyListingsView },
									{ name: "My Orders", TabContent: MyOrdersView },
									{ name: "My Planets", TabContent: MyPlanetsView },
									{ name: "Guide", TabContent: GuideView }
								]}
							/>
						</ListingsProvider>
					</MyTransactionProvider>
				</MySignerProvider>
			</ConnectionProvider>
		</ContractProvider>
	);
}