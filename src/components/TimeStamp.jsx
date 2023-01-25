import { useState, useEffect } from 'react'; 

function Comment({ comment }) { 
    const [timeSinceComment, setTimeSinceComment] = useState(calculateTimeSinceComment(comment.timestamp));

    useEffect(() => { 
        const intervalId = setInterval(() => { 
            setTimeSinceComment(calculateTimeSinceComment(comment.timestamp)); 
        }, 5000); 

        return () => clearInterval(intervalId); 
    }, [comment]); 

    return ( 
        <div className="comment"> 
            <div className="comment-text">{comment.text}</div> 
            <div className="comment-timestamp">{timeSinceComment}</div> 
        </div> 
    ); 
}
 
function calculateTimeSinceComment(timestamp) { 
    const secondsSinceComment = (Date.now() - timestamp) / 1000; 

    if (secondsSinceComment < 60) { 
        return `${secondsSinceComment.toFixed(0)} seconds ago`; 
    }

    else if (secondsSinceComment < 3600) { 
        return `${(secondsSinceComment / 60).toFixed(0)} minutes ago`; 
    }

    else if (secondsSinceComment < 86400) { 
        return `${(secondsSinceComment / 3600).toFixed(0)} hours ago`; 
    }

    else { 
        return `${(secondsSinceComment / 86400).toFixed(0)} days ago`; 
    } 
}