export interface ContractTemplate {
  id: string
  name: string
  description: string
  code: string
  abi: any[]
  bytecode: string
  constructorParams: ConstructorParam[]
}

export interface ConstructorParam {
  name: string
  type: string
  description: string
  required: boolean
}

export const ERC20_TEMPLATE: ContractTemplate = {
  id: "erc20",
  name: "ERC20 Token",
  description: "Standard fungible token with mint, burn, and transfer capabilities",
  code: `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BitnunEcoToken is ERC20, ERC20Burnable, Pausable, Ownable {
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply * 10**decimals());
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }
}`,
  abi: [
    {
      inputs: [
        { name: "name", type: "string" },
        { name: "symbol", type: "string" },
        { name: "initialSupply", type: "uint256" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        { name: "to", type: "address" },
        { name: "amount", type: "uint256" },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
  bytecode: "0x608060405234801561001057600080fd5b50...", // Truncated for brevity
  constructorParams: [
    {
      name: "name",
      type: "string",
      description: "The name of the token (e.g., 'EcoToken')",
      required: true,
    },
    {
      name: "symbol",
      type: "string",
      description: "The symbol of the token (e.g., 'ECO')",
      required: true,
    },
    {
      name: "initialSupply",
      type: "uint256",
      description: "Initial token supply (without decimals)",
      required: true,
    },
  ],
}

export const ERC721_TEMPLATE: ContractTemplate = {
  id: "erc721",
  name: "ERC721 NFT",
  description: "Non-fungible token contract for unique digital assets",
  code: `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BitnunEcoNFT is ERC721, ERC721Enumerable, ERC721URIStorage, Pausable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    uint256 public maxSupply;
    uint256 public mintPrice;

    constructor(
        string memory name,
        string memory symbol,
        uint256 _maxSupply,
        uint256 _mintPrice
    ) ERC721(name, symbol) {
        maxSupply = _maxSupply;
        mintPrice = _mintPrice;
    }

    function safeMint(address to, string memory uri) public payable {
        require(msg.value >= mintPrice, "Insufficient payment");
        require(_tokenIdCounter.current() < maxSupply, "Max supply reached");
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}`,
  abi: [
    {
      inputs: [
        { name: "name", type: "string" },
        { name: "symbol", type: "string" },
        { name: "maxSupply", type: "uint256" },
        { name: "mintPrice", type: "uint256" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
  ],
  bytecode: "0x608060405234801561001057600080fd5b50...",
  constructorParams: [
    {
      name: "name",
      type: "string",
      description: "The name of the NFT collection",
      required: true,
    },
    {
      name: "symbol",
      type: "string",
      description: "The symbol of the NFT collection",
      required: true,
    },
    {
      name: "maxSupply",
      type: "uint256",
      description: "Maximum number of NFTs that can be minted",
      required: true,
    },
    {
      name: "mintPrice",
      type: "uint256",
      description: "Price to mint each NFT (in wei)",
      required: true,
    },
  ],
}

export const GOVERNANCE_TEMPLATE: ContractTemplate = {
  id: "governance",
  name: "DAO Governance",
  description: "Decentralized governance with proposals and voting",
  code: `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";

contract BitnunEcoGovernor is 
    Governor,
    GovernorSettings,
    GovernorCountingSimple,
    GovernorVotes,
    GovernorVotesQuorumFraction,
    GovernorTimelockControl
{
    constructor(
        IVotes _token,
        TimelockController _timelock,
        string memory _name
    )
        Governor(_name)
        GovernorSettings(1, 45818, 0) // 1 block, 1 week, 0 proposal threshold
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(4) // 4% quorum
        GovernorTimelockControl(_timelock)
    {}

    function votingDelay()
        public
        view
        override(IGovernor, GovernorSettings)
        returns (uint256)
    {
        return super.votingDelay();
    }

    function votingPeriod()
        public
        view
        override(IGovernor, GovernorSettings)
        returns (uint256)
    {
        return super.votingPeriod();
    }

    function quorum(uint256 blockNumber)
        public
        view
        override(IGovernor, GovernorVotesQuorumFraction)
        returns (uint256)
    {
        return super.quorum(blockNumber);
    }

    function proposalThreshold()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.proposalThreshold();
    }
}`,
  abi: [],
  bytecode: "0x608060405234801561001057600080fd5b50...",
  constructorParams: [
    {
      name: "name",
      type: "string",
      description: "Name of the DAO governance contract",
      required: true,
    },
  ],
}

export const CONTRACT_TEMPLATES = {
  erc20: ERC20_TEMPLATE,
  erc721: ERC721_TEMPLATE,
  governance: GOVERNANCE_TEMPLATE,
}

export class NativeContractDeployer {
  private wasmModule: any

  constructor(wasmModule: any) {
    this.wasmModule = wasmModule
  }

  async deployContract(
    templateId: string,
    constructorArgs: any[],
    deployerAddress: string,
  ): Promise<{ address: string; transactionHash: string }> {
    const template = CONTRACT_TEMPLATES[templateId as keyof typeof CONTRACT_TEMPLATES]
    if (!template) {
      throw new Error(`Template ${templateId} not found`)
    }

    // Simulate contract deployment in WASM
    const contractAddress = this.generateContractAddress(deployerAddress)
    const transactionHash = this.generateTransactionHash()

    // Deploy to WASM runtime
    const deploymentResult = await this.wasmModule.deployContract({
      bytecode: template.bytecode,
      abi: template.abi,
      constructorArgs,
      deployer: deployerAddress,
    })

    if (!deploymentResult.success) {
      throw new Error(`Deployment failed: ${deploymentResult.error}`)
    }

    return {
      address: contractAddress,
      transactionHash,
    }
  }

  private generateContractAddress(deployerAddress: string): string {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substr(2, 8)
    return `0x${timestamp.toString(16)}${random}`
  }

  private generateTransactionHash(): string {
    return `0x${Math.random().toString(16).substr(2, 64)}`
  }

  async getContractCode(address: string): Promise<string> {
    // Retrieve deployed contract code from WASM runtime
    return await this.wasmModule.getContractCode(address)
  }

  async callContract(address: string, method: string, args: any[], caller: string): Promise<any> {
    // Execute contract method in WASM runtime
    return await this.wasmModule.callContract({
      address,
      method,
      args,
      caller,
    })
  }
}

export const nativeContractDeployer = new NativeContractDeployer(null) // Will be initialized with WASM module
