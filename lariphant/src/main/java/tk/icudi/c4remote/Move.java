package tk.icudi.c4remote;

public class Move {

	private int playerNumber = -1;
	private int columnNumber = -1;

	public int getPlayerNumber() {
		return playerNumber;
	}

	public void setPlayerNumber(int playerNumber) {
		this.playerNumber = playerNumber;
	}

	public int getColumnNumber() {
		return columnNumber;
	}

	public void setColumnNumber(int columnNumber) {
		this.columnNumber = columnNumber;
	}

	@Override
	public String toString() {
		return "Move [playerNumber=" + playerNumber + ", columnNumber=" + columnNumber + "]";
	}
	
	

}
