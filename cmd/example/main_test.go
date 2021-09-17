package main

import "testing"

func Test(t *testing.T) {
	t.Fatal("xxx")
	t.Skip()
}
