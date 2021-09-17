package main

import (
	"fmt"
	"log"
	"net"
	"os"

	"github.com/nokamoto/sandbox/internal/proto/api/example/v1alpha"
	"google.golang.org/grpc"
)

func main() {
	lis, err := net.Listen("tcp", fmt.Sprintf(":%s", os.Getenv("GRPC_PORT")))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	v1alpha.RegisterExampleServiceServer(s, v1alpha.UnimplementedExampleServiceServer{})
	log.Printf("server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
