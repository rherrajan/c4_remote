package tk.icudi.lariphant;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/lariphant")
public class LariphantController {

//	private static final Logger log = Logger.getLogger(LariphantController.class.getName());
	
	private static List<Player> players = new ArrayList<>();

	@RequestMapping("/requestplayers")
	public ResponseEntity<List<Player>> requestplayers() {
		return new ResponseEntity<List<Player>>(players, HttpStatus.OK);
	}
	
	@RequestMapping("/createplayer")
	public ResponseEntity<Player> createplayer() {
		
		Player player = new Player();
		player.setNr(players.size());
		players.add(player);
		
		return new ResponseEntity<Player>(player, HttpStatus.OK);
	}

	@RequestMapping("/moveplayer/{playerNumber}/{x}/{y}")
	public ResponseEntity<Player> moveplayer(@PathVariable int playerNumber, @PathVariable int x, @PathVariable int y) {
		
		Player player = players.get(playerNumber -1);
		player.setX(x);
		player.setY(y);
		
		return new ResponseEntity<Player>(player, HttpStatus.OK);
	}
	
	
}
