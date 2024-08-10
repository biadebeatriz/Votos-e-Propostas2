import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { useEffect, useRef, useState } from "react";
import { WHITELIST_CONTRACT_ADDRESS, abi } from "./constants";
import { ethers } from 'ethers';
import Swal from 'sweetalert2'
//const MySwal = withReactContent(Swal)
const App = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();
  const [proposal, setProposal] = useState({
    title: "",
    description: "",
  });
  const [times, setTimes] = useState([]);
  const [currentTime, setCurrentTime] = useState(null);
  const [proposals, setProposals] = useState([false]);
  const [reversedProposals, setReversedProposals] = useState([]);
  const [renderHandler, setRenderHandler] = useState(0);
  const [remainingTimes, setRemainingTimes] = useState([]);
  const networkId = 11155111; // Sepolia Network ID
  const networkName = "Sepolia test network";


  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the Sepolia network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 11155111) {
      const emoji = String.fromCodePoint(0x1F613);
      Swal.fire({
        title: "Mude de rede para a Sepolia",
        text: "Não se preocupe a gente muda para você",
        icon: "warning"
      });
      throw new Error("Mude a rede para Sepolia");
    }
  
    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;

    }

    return web3Provider;
  };

  const addProposal = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(WHITELIST_CONTRACT_ADDRESS, abi, signer);
      const tx = await contract.addProposal(
        proposal.title,
        proposal.description
      );
      await tx.wait();
      const emoji = String.fromCodePoint(0x1F984);
      Swal.fire({
        title: "Bom Trabalho!",
        text: "Adicionado a proposta",
        icon: "success"
      });;
      setRenderHandler(renderHandler + 1);
    } catch (err) {
      console.error(err);
    }
  };

  const getProposals = async () => {
    try {
      const provider = await getProviderOrSigner();
      const contract = new Contract(WHITELIST_CONTRACT_ADDRESS, abi, provider);
      const proposals = await contract.getProposals();
      console.log(proposals);
      setProposals(proposals);
      setReversedProposals([...proposals].reverse());
    } catch (err) {
      console.error(err);
    }
  };

  function emoticon(emot){
    const emoji = String.fromCodePoint(emot);
    return emoji
  }

  const vote = async (proposalId, vote) => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(WHITELIST_CONTRACT_ADDRESS, abi, signer);
      //vote is boolean
      const account = await signer.getAddress();
      const hasVoted = await contract.hasVoted(proposalId, account);
      
      if (hasVoted) {
        const emoji = String.fromCodePoint(0x1F62D);
        Swal.fire({
          title: "Votar duas vezes nao podiiiiiiiiii!",
          text: "É permitido apenas um voto por pessoa!",
          icon: "error"
        });
        return;
      }
      const tx = await contract.vote(proposalId, vote);
      
      await tx.wait();
      const emoji = String.fromCodePoint(0x1F603);
      Swal.fire({
        title: "Você é um cara de opnião!",
        text: "Seu voto foi consumado com sucesso",
        icon: "success"
      });
      setRenderHandler(renderHandler + 1);
    } catch (err) {
      console.error(err);
    }
  };

    const proposalData = async()=>{
      try{const signer = await getProviderOrSigner(true);
      const contract = new Contract(WHITELIST_CONTRACT_ADDRESS, abi, signer);
      const tx = await contract.upDateProsals();
      await tx.await;
      setProposals(true);
      }
      catch (err) {
        console.error(err);
      }
    }
    const connectWallet = async () => {
      try {
        if (!window.ethereum) {
          MySwal.fire({
            title: "Você precisa ter metamask",
            text: "Essa aplicação precisa ter a instalação da metamask",
            icon: "warning"
          });
          return;
        }
  
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
  
        // Create an ethers provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const { chainId } = await provider.getNetwork();
  
        // Check if the user is on the correct network
        if (chainId !== networkId) {
          // Request network switch
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: `0x${networkId.toString(16)}`,
              chainName: networkName,
              nativeCurrency: {
                name: "SepoliaETH",
                symbol: "ETH",
                decimals: 18,
              },
              rpcUrls: ["https://sepolia.infura.io/v3/"],
              blockExplorerUrls: ["https://sepolia.etherscan.io"],
            }],
          });
        }
  
        setWalletConnected(true);
      } catch (error) {
        console.error("Error connecting wallet or changing network:", error);
        Swal.fire({
          title: "OPS!",
          text: "Falha a se conectar a metamask ou mudar de rede",
          icon: "error"
        });
      }
    };
  



  useEffect(() => {
    getProposals();
  }, [walletConnected, renderHandler]);

  useEffect(() => {
    const fetchRemainingTimes = async () => {
      const signer = await getProviderOrSigner(true);
      const contract = new Contract(WHITELIST_CONTRACT_ADDRESS, abi, signer);
      const times = await contract.howMuchTimeLeft();
      setRemainingTimes(times);
    };

    if (reversedProposals.length > 0) {
      fetchRemainingTimes();
    }
  }, [reversedProposals]);




  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTimes((prevTimes) =>
        prevTimes.map((time) => (time > 0 ? time - 1 : 0))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const hrs = Math.floor((seconds % 86400) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days}d ${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };


  return (
    <div className="flex  flex-col justify-start items-center p-4 text-white bg-[#fff1dB] min-h-screen h-full">
      {!walletConnected && (
        <><button
          className="absolute border object-center bg-gradient-to-r from-[#ef5a6f] to-[#536493] hover:from-[#d4bdac] hover:to-[#536493] text-white font-bold p-2 m-3 rounded-full "
          onClick={connectWallet}
        >
          Conectar Carteira
        </button><div>

          </div>            <div className="clock">

            </div></>
      )}
      {walletConnected&&(
        <div>
          <div className=" bg-[#ef5a6f] rounded-lg text-white pb-4 pt-6 pl-4 pr-4">
            <p>Bem vindo ao sites de propostas, seu voto é sigiloso, só é possível votar uma vez em cada proposta e cada proposta tem duração de 1 semana.
            </p>
          </div>
          <div className="flex">
            <div className="flex flex-row pt-4 pb-4">
            <input
              type="text"
              placeholder="Título"
              value={proposal.title}
              onChange={(e) =>
                setProposal({ ...proposal, title: e.target.value })
              }
              className="border p-2 mr-4 text-black rounded-lg"
            />
            <input
              type="text"
              placeholder="Descrição"
              value={proposal.description}
              onChange={(e) =>
                setProposal({ ...proposal, description: e.target.value })
              }
              className="border p-2 text-black rounded-lg"
              />
            </div>
            <div className="text-lg">
              <button className="bg-[#d4bdac] text-black rounded-full p-3 m-4" onClick={addProposal}>
                Adicionar Proposta 
              </button>
              
              <div className="clock">

            </div>
            </div>
          </div>
          {reversedProposals.map((proposal, index) =>(
          <div className="flex justify-around p-8 columns-2 border-4 rounded-lg border-color: rgb(ef5a6f)">
            <div>
              <div key={index} className=" break-inside-avoid-column text-black p-4 min-w-[350px] w-auto ">
                <h3 className="pb-2">Título: {proposal.title}</h3>
                <p className="pb-2">Descrição: {proposal.description}</p>
                <div className="flex justify-between">

                  <button
                    className="border rounded-lg p-2 bg-red-600 text-white font-semibold"
                    onClick={() => vote(proposal.id, false)}
                  >
                    Não
                  </button>
                  <button
                    className="border rounded-lg p-2 bg-green-600 text-white font-semibold "
                    onClick={() => vote(proposal.id, true)}
                  >
                    Sim
                  </button>
                </div>
                <div className=" break-inside-avoid-column flex justify-between ">
                  {/* //get vote counts */}
                  <p className="text-red-600">
                    Não: {proposal.noVotes.toNumber()}
                  </p>
                  <p className="text-green-600">
                    Sim: {proposal.yesVotes.toNumber()}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div>
                 <p className="text-lg p-14 justify:center min-w-[350px] w-auto text-black">Tempo restante para votação encerrar: </p>
                  <p className="p-8 min-w-[350px] w-auto text-black pl-14 text-4xl uppercase font-mono:monospace">
                    {formatTime(remainingTimes[index])} {emoticon(0x231B)}
                  </p>
              </div>
            </div>

          </div>

          ))}

        </div>
      )}
    </div>
  );
};

export default App;