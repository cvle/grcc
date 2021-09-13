require "test_helper"

class Review2ControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get review2_index_url
    assert_response :success
  end
end
