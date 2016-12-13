package tk.icudi.c4remote;

import java.util.logging.Logger;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/c4")
public class C4OpponentController {

	private static final Logger log = Logger.getLogger(C4OpponentController.class.getName());
	
	  
	private static Move lastMove = new Move();

	public C4OpponentController() {
		System.out.println(" --- create --- ");
	}
	@RequestMapping("/move/{playerNumber}/{columnNumber}")
	public ResponseEntity<String> move(Move move) {

		lastMove = move;
		log.info(" --- move: " + move);

		return new ResponseEntity<String>("ok", HttpStatus.OK);
	}
	
	@RequestMapping("/column/{askingPlayerNumber}")
	public ResponseEntity<Column> row(@PathVariable int askingPlayerNumber) {
		
		log.info(" --- askingPlayerNumber: " + askingPlayerNumber);
		
		Column result = new Column();
		
		if(lastMove.getPlayerNumber() == askingPlayerNumber){
			result=null;
		} else {
			result.setColumnNumber(lastMove.getColumnNumber());
		}
		return new ResponseEntity<Column>(result, HttpStatus.OK);
	}

//	@RequestMapping("/board")
//	public ResponseEntity<Column> board() {
//
//		Column row = new Column();
//		row.setRownumber(6);
//		row = null;
//		return new ResponseEntity<Column>(row, HttpStatus.OK);
//	}
	
}
