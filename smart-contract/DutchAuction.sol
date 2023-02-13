// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

interface IERC721 {
    function transferFrom(address _from, address _to, uint _nftId) external;

    function getApproved(
        uint256 tokenId
    ) external view returns (address operator);
}

contract DutchAuction {
    //Duration of the Auction
    uint32 private constant DURATION = 1 days;

    IERC721 nft;
    uint nftId;

    address payable public seller;

    uint public startAt;
    uint public endAt;
    uint public startingPrice;
    uint public discountRate;

    error AuctionEnded();
    error NotEnough_ETH();
    error Call_Failed();

    //assigning state variables
    function start(
        uint _startingPrice,
        uint _discountRate,
        uint _nftId,
        address _nft
    ) public {
        startAt = block.timestamp;
        endAt = block.timestamp + DURATION;
        startingPrice = _startingPrice;
        discountRate = _discountRate;
        nftId = _nftId;
        nft = IERC721(_nft);
        seller = payable(msg.sender);

        require(nft.getApproved(nftId) == address(this));
        require(_startingPrice >= 0.0001 ether, "Not Enough Starting Price");
    }

    function getPrice() public view returns (uint) {
        // Calculate the number of 5 minute intervals that have passed
        // since the start of the sale
        uint intervals = (block.timestamp - startAt) / 5 minutes;

        // Calculate the discount by multiplying the discount rate
        // by the number of 5 minute intervals that have passed
        uint discount = discountRate * intervals;

        // Return the current price by subtracting the discount
        // from the starting price
        return startingPrice - discount;
    }

    function getTime() public pure returns (uint t) {
        return t = 5 minutes;
    }

    function getRemainingTime() public view returns (uint) {
        if (block.timestamp < startAt) {
            return startAt - block.timestamp;
        } else if (block.timestamp > endAt) {
            return 0;
        } else {
            return endAt - block.timestamp;
        }
    }

    //allows to buy the nft
    function buy() external payable {
        if (block.timestamp > endAt) {
            revert AuctionEnded();
        }

        uint price = getPrice();
        if (msg.value < price) {
            revert NotEnough_ETH();
        }

        nft.transferFrom(seller, msg.sender, nftId);
        uint refund = msg.value - price;

        //refunded the execess amount to the buyer
        if (refund > 0) {
            (bool success, ) = payable(msg.sender).call{value: refund}("");

            if (!success) {
                revert Call_Failed();
            }
        }
        transfer();
    }

    function transfer() private {
        (bool success, ) = payable(seller).call{value: address(this).balance}(
            ""
        );
        if (!success) {
            revert Call_Failed();
        }
    }
}
