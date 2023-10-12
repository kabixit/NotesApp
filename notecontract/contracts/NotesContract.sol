// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract NotesContract {
    mapping(address => string) public userNotes;

    event NoteCreated(address indexed creator, string note);

    function createNote(string memory note) public {
        require(bytes(note).length > 0, "Note cannot be empty");
        userNotes[msg.sender] = note;
        emit NoteCreated(msg.sender, note);
    }

    function getNote() public view returns (string memory) {
        return userNotes[msg.sender];
    }
}
